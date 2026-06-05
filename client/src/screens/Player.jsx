import React, { useState } from "react";
import audioEngine from "../audioEngine";

export default function Player() {
  const [status, setStatus] = useState("Idle");

  const play = () => {
    audioEngine.init();
    audioEngine.play("/audio/track1.mp3");
    setStatus("Playing");
  };

  const pause = () => {
    audioEngine.pause();
    setStatus("Paused");
  };

  const nextDemo = () => {
    audioEngine.play("/audio/track2.mp3");
    setStatus("Next track");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎧 Prayer Audio Player</h1>

      <p>Status: {status}</p>

      <button onClick={play}>▶ Play</button>
      <button onClick={pause} style={{ marginLeft: 10 }}>⏸ Pause</button>
      <button onClick={nextDemo} style={{ marginLeft: 10 }}>⏭ Next</button>
    </div>
  );
}