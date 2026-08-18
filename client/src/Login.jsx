import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const isCreateMode = mode === "create";

  const friendlyError = (err) => {
    switch (err?.code) {
      case "auth/email-already-in-use":
        return "An account already exists with this email address.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Please choose a stronger password.";
      case "auth/user-not-found":
        return "No account was found for this email address.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email address or password.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a little and try again.";
      case "auth/network-request-failed":
        return "Network connection problem. Please check your internet connection.";
      default:
        return "Something went wrong. Please check your details and try again.";
    }
  };

  const resetMessages = () => {
    setError("");
    setNotice("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setPassword("");
    setConfirmPassword("");
    resetMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    resetMessages();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (isCreateMode && password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (isCreateMode) {
        await createUserWithEmailAndPassword(auth, cleanEmail, password);
        console.log("Account created successfully");
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
        console.log("Login successful");
      }

      // AuthProvider automatically moves authenticated users into AppShell.
    } catch (err) {
      console.error("[AUTH]", err);
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (loading) return;

    resetMessages();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Enter your email address first, then tap Forgot password.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setNotice(
        "Password reset email sent. Please check your inbox and spam folder."
      );
    } catch (err) {
      console.error("[PASSWORD RESET]", err);
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.content}>
        <img
          src="/images/login/shane-login-header.png"
          alt="Pundit Shane Maharaj"
          style={styles.heroImage}
        />

        <div style={styles.loginQuote}>
          LIVE TO PRAY
          <br />
          PRAY TO LIVE
        </div>

        <div style={styles.modeTabs}>
          <button
            type="button"
            onClick={() => switchMode("signin")}
            style={{
              ...styles.modeButton,
              ...(mode === "signin" ? styles.modeButtonActive : {}),
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => switchMode("create")}
            style={{
              ...styles.modeButton,
              ...(mode === "create" ? styles.modeButtonActive : {}),
            }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.card}>
          <label style={styles.label} htmlFor="login-email">
            Email address
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetMessages();
            }}
            autoComplete="email"
            style={styles.input}
            required
          />

          <label style={styles.label} htmlFor="login-password">
            Password
          </label>

          <div style={styles.passwordRow}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                resetMessages();
              }}
              autoComplete={isCreateMode ? "new-password" : "current-password"}
              style={styles.passwordInput}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              style={styles.showButton}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {isCreateMode && (
            <>
              <label style={styles.label} htmlFor="confirm-password">
                Confirm password
              </label>

              <div style={styles.passwordRow}>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    resetMessages();
                  }}
                  autoComplete="new-password"
                  style={styles.passwordInput}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  style={styles.showButton}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </>
          )}

          {!isCreateMode && (
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              style={styles.forgotButton}
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading
              ? isCreateMode
                ? "Creating account..."
                : "Entering..."
              : isCreateMode
                ? "CREATE ACCOUNT"
                : "NAMASTE"}
          </button>

          {error && (
            <p role="alert" style={styles.error}>
              {error}
            </p>
          )}

          {notice && (
            <p role="status" style={styles.notice}>
              {notice}
            </p>
          )}

          <p style={styles.switchText}>
            {isCreateMode
              ? "Already have an account?"
              : "New to Shane Satsang?"}

            <button
              type="button"
              onClick={() =>
                switchMode(isCreateMode ? "signin" : "create")
              }
              style={styles.switchButton}
            >
              {isCreateMode ? " Sign In" : " Create Account"}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflowY: "auto",
    background: "#120718",
    color: "#ffffff",
  },

  content: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 18px 28px",
    boxSizing: "border-box",
  },

  heroImage: {
    width: "100%",
    maxWidth: 430,
    height: "auto",
    display: "block",
    objectFit: "contain",
    borderRadius: "0 0 24px 24px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
  },

  loginQuote: {
    marginTop: 16,
    marginBottom: 2,
    textAlign: "center",
    color: "#F1CD69",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: 1,
  },

  modeTabs: {
    width: "100%",
    maxWidth: 350,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginTop: 24,
  },

  modeButton: {
    padding: "10px 8px",
    borderRadius: 10,
    border: "1px solid rgba(241,205,105,0.35)",
    background: "rgba(37,12,53,0.45)",
    color: "#D8C8DD",
    fontWeight: 700,
    cursor: "pointer",
  },

  modeButtonActive: {
    border: "1px solid #F1CD69",
    background: "rgba(241,205,105,0.16)",
    color: "#F1CD69",
  },

  card: {
    width: "100%",
    maxWidth: 350,
    boxSizing: "border-box",
    marginTop: 12,
    padding: "14px 16px 18px",
    borderRadius: 18,
    background: "rgba(37, 12, 53, 0.42)",
    border: "1px solid rgba(241, 205, 105, 0.28)",
    boxShadow: "0 12px 34px rgba(0, 0, 0, 0.24)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  label: {
    display: "block",
    margin: "12px 0 6px",
    color: "#F1CD69",
    fontSize: 13,
    fontWeight: 700,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 2px 9px",
    borderRadius: 0,
    border: "none",
    borderBottom: "1px solid rgba(241,205,105,0.9)",
    background: "transparent",
    color: "#ffffff",
    fontSize: 16,
    outline: "none",
  },

  passwordRow: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(241,205,105,0.9)",
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    padding: "10px 2px 9px",
    border: "none",
    background: "transparent",
    color: "#ffffff",
    fontSize: 16,
    outline: "none",
  },

  showButton: {
    border: "none",
    background: "transparent",
    color: "#F1CD69",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    padding: "8px 2px 8px 12px",
  },

  forgotButton: {
    display: "block",
    margin: "12px 0 0 auto",
    border: "none",
    background: "transparent",
    color: "#F1CD69",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
  },

  button: {
    width: "100%",
    marginTop: 20,
    padding: "15px 16px",
    border: "1px solid #F6D875",
    borderRadius: 12,
    background:
      "linear-gradient(135deg, #B97813 0%, #F1CD69 48%, #C98A1D 100%)",
    color: "#24102F",
    fontSize: 15,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  error: {
    margin: "14px 0 0",
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(143,45,45,0.34)",
    border: "1px solid rgba(255,130,130,0.45)",
    color: "#FFD6D6",
    fontSize: 13,
    lineHeight: 1.4,
    textAlign: "center",
  },

  notice: {
    margin: "14px 0 0",
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(46,125,82,0.25)",
    border: "1px solid rgba(111,214,151,0.4)",
    color: "#D4FFE4",
    fontSize: 13,
    lineHeight: 1.4,
    textAlign: "center",
  },

  switchText: {
    margin: "18px 0 0",
    textAlign: "center",
    color: "#D8C8DD",
    fontSize: 13,
  },

  switchButton: {
    border: "none",
    background: "transparent",
    color: "#F1CD69",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
    padding: 0,
  },
};