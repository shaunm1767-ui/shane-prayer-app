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

      // IMPORTANT:
      // DO NOT navigate manually — AuthProvider handles routing
      console.log("Login successful");
    } catch (err) {
      console.error(err);

      let msg = "Login failed";

      if (err.code === "auth/user-not-found") msg = "User not found";
      if (err.code === "auth/wrong-password") msg = "Wrong password";
      if (err.code === "auth/invalid-email") msg = "Invalid email";
      if (err.code === "auth/api-key-not-valid.-please-pass-a-valid-api-key.")
        msg = "Firebase config error";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h2>🙏 Shane Prayer App</h2>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}
