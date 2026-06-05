import React, { useContext } from "react";
import Login from "./Login";
import Home from "./Home";
import { AuthContext } from "./AuthProvider";

export default function App() {
  const { user } = useContext(AuthContext);

  // 🔥 HARD RULE: no user = login only
  if (!user) {
    return <Login />;
  }

  return <Home />;
}