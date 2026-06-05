import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>🙏 Home Dashboard</h1>

      <button onClick={() => navigate("/player")}>
        Go to Player
      </button>
    </div>
  );
}