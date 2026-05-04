import React, { useEffect, useState } from "react";
import audioEngine from "../audioEngine.js";

export default function HomeScreen() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const lastTrack = localStorage.getItem("lastTrack");

    if (lastTrack) {
      setHasSession(true);
      audioEngine.resumeLast();
    }
  }, []);

  const play = () => {
    audioEngine.play("/audio/track1.mp3");
    setHasSession(true);
  };

  const pause = () => {
    audioEngine.pause();
  };

  const clear = () => {
    localStorage.removeItem("lastTrack");
    localStorage.removeItem("lastTime");
    setHasSession(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>HOME</h1>

      <p style={{ marginBottom: 20 }}>
        {hasSession ? "Continue Listening Available" : "No Previous Session"}
      </p>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={play}>▶ Play</button>
        <button onClick={pause}>⏸ Pause</button>
        <button onClick={clear}>🗑 Clear</button>
      </div>
    </div>
  );
}