import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // AuthProvider handles the authenticated app state.
      console.log("Login successful");
    } catch (err) {
      console.error(err);

      let msg = "Login failed. Please check your details and try again.";

      if (err.code === "auth/user-not-found") msg = "User not found.";
      if (err.code === "auth/wrong-password") msg = "Wrong password.";
      if (err.code === "auth/invalid-credential")
        msg = "Incorrect email address or password.";
      if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      if (err.code === "auth/too-many-requests")
        msg = "Too many attempts. Please try again later.";
      if (err.code === "auth/api-key-not-valid.-please-pass-a-valid-api-key.")
        msg = "Firebase configuration error.";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.content}>
        <img
          src="/images/login/shane-login-hero.png"
          alt="Pundit Shane Maharaj"
          style={styles.heroImage}
        />

        <form onSubmit={handleLogin} style={styles.card}>

          <label style={styles.label} htmlFor="login-email">
            Email address
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={styles.input}
            required
          />

          <label style={styles.label} htmlFor="login-password">
            Password
          </label>

          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Entering..." : "🙏 Enter Prayer Space"}
          </button>

          {error && (
            <p role="alert" style={styles.error}>
              {error}
            </p>
          )}
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

  card: {
    width: "100%",
    maxWidth: 430,
    boxSizing: "border-box",
    padding: "22px 20px",
    borderRadius: 24,
    background:
      "linear-gradient(180deg, rgba(49,16,68,0.94), rgba(23,8,33,0.97))",
    border: "1px solid rgba(241,205,105,0.75)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
    backdropFilter: "blur(12px)",
  },

  lotus: {
    textAlign: "center",
    color: "#F1CD69",
    fontSize: 30,
    lineHeight: 1,
  },

  title: {
    margin: "10px 0 4px",
    textAlign: "center",
    color: "#F1CD69",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: 0.3,
  },

  subtitle: {
    margin: "0 0 20px",
    textAlign: "center",
    color: "#F5EBD7",
    fontSize: 15,
    lineHeight: 1.45,
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
    padding: "14px 15px",
    borderRadius: 12,
    border: "1px solid rgba(241,205,105,0.35)",
    background: "rgba(12,5,18,0.72)",
    color: "#ffffff",
    fontSize: 16,
    outline: "none",
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

  footer: {
    width: "100%",
    maxWidth: 430,
    paddingTop: 22,
    textAlign: "center",
  },

  quote: {
    color: "#F1CD69",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: 1,
  },

  author: {
    marginTop: 10,
    color: "#E0B951",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 16,
    fontStyle: "italic",
  },

  version: {
    marginTop: 18,
    color: "#CBBFD1",
    fontSize: 12,
  },
};




