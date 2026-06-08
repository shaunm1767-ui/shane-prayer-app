import React, { useContext } from "react";
import Login from "./Login";
import AppShell from "./layout/AppShell";
import { AuthContext } from "./AuthProvider";

export default function App() {
  const { user } = useContext(AuthContext);

  if (!user) return <Login />;

  return <AppShell />;
}