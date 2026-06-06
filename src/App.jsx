import React, { useContext } from "react";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Player from "./screens/Player";
import { AuthContext } from "./AuthProvider";

export default function App() {
  const { user } = useContext(AuthContext);

  // 1. NOT LOGGED IN → LOGIN ONLY
  if (!user) return <Login />;

  // 2. LOGGED IN → MAIN APP FLOW
  return <HomeScreen />;
}