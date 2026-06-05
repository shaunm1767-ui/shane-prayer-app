import React, { useState } from "react";
import Player from "./screens/Player";

export default function Home() {
  const [openPlayer, setOpenPlayer] = useState(false);

  if (openPlayer) {
    return <Player />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🙏 Shane Prayer App</h2>

      <p>Home screen loaded successfully.</p>

      <button
        onClick={() => setOpenPlayer(true)}
        style={{
          padding: 10,
          marginTop: 20,
          cursor: "pointer"
        }}
      >
        ▶ Open Player
      </button>
    </div>
  );
}