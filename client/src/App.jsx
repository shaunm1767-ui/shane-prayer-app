import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";

import Player from "./screens/Player";
import Home from "./screens/HomeScreen";
import { AuthContext } from "./AuthProvider";

export default function App() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/player" element={<Player />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}