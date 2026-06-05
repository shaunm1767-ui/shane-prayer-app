import React, { useEffect, useState } from "react";
import audioEngine from "../audioEngine.js";

export default function NowPlayingBar() {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔄 sync with engine every second (simple + stable)
  useEffect(() => {
    const interval = setInterval(() => {
      setTrack(audioEngine.getCurrentTrack?.() || audioEngine.currentTrack);
      setIsPlaying(audioEngine.isPlaying);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  const togglePlay = () => {
    if (audioEngine.isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.play(track);
    }
  };

  const skipNext = () => audioEngine.next();
  const skipPrev = () => audioEngine.previous();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 60,
        left: 0,
        right: 0,
        background: "#111",
        color: "#fff",
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 9999,
      }}
    >
      {/* LEFT: TRACK INFO */}
      <div style={{ fontSize: 12 }}>
        🎧 Now Playing
        <div style={{ fontWeight: "bold" }}>
          {track.split("/").pop()}
        </div>
      </div>

      {/* CENTER: CONTROLS */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={skipPrev}>⏮</button>
        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={skipNext}>⏭</button>
      </div>
    </div>
  );
}