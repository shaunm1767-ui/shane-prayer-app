import React from "react";
import AppShell from "./layout/AppShell";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import Login from "./Login";

export default function App() {
  const { user } = useContext(AuthContext);

  if (!user) return <Login />;

  return <AppShell />;
}