import React, { useEffect, useState } from "react";
import audioEngine from "../audioEngine.js";

export default function HomeScreen() {
  const [hasSession, setHasSession] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // 🎧 playlist (simple local source)
  const playlist = [
    "/audio/track1.mp3",
    "/audio/track2.mp3",
    "/audio/track3.mp3",
  ];

  // =========================
  // 🔄 INIT SESSION
  // =========================
  useEffect(() => {
    const savedTrack = localStorage.getItem("lastTrack");

    if (savedTrack) {
      setHasSession(true);
      setCurrentTrack(savedTrack);

      audioEngine.resumeLast();
    }
  }, []);

  // =========================
  // ▶ PLAY SELECTED TRACK
  // =========================
  const playTrack = (track, index) => {
    console.log("PLAY TRACK:", track);

    audioEngine.loadQueue(playlist, index);
    audioEngine.play(track);

    setCurrentTrack(track);
    setHasSession(true);
  };

  // =========================
  // ▶ CONTINUE SESSION
  // =========================
  const handleContinue = () => {
    const track = localStorage.getItem("lastTrack");
    if (!track) return;

    audioEngine.play(track);
    setCurrentTrack(track);
  };

  const handlePause = () => {
    audioEngine.pause();
  };

  const clearSession = () => {
    localStorage.removeItem("lastTrack");
    localStorage.removeItem("lastTime");
    localStorage.removeItem("playlist");
    localStorage.removeItem("currentIndex");

    setHasSession(false);
    setCurrentTrack(null);

    audioEngine.stop?.();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>HOME</h1>

      {/* =========================
          🎧 CONTINUE LISTENING
         ========================= */}
      {hasSession && (
        <div
          style={{
            padding: 15,
            border: "1px solid #ddd",
            borderRadius: 10,
            marginBottom: 20,
            background: "#f5fbff",
          }}
        >
          <h3 style={{ margin: 0 }}>Continue Listening</h3>

          <button
            onClick={handleContinue}
            style={{ marginTop: 10, padding: 10 }}
          >
            ▶ Resume Last Session
          </button>
        </div>
      )}

      {/* =========================
          🎧 PLAYLIST UI
         ========================= */}
      <h3>Playlist</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {playlist.map((track, index) => (
          <div
            key={track}
            onClick={() => playTrack(track, index)}
            style={{
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
              cursor: "pointer",
              background:
                currentTrack === track ? "#dff3ff" : "white",
              fontWeight:
                currentTrack === track ? "bold" : "normal",
            }}
          >
            🎵 Track {index + 1}
          </div>
        ))}
      </div>

      {/* =========================
          🎮 CONTROLS
         ========================= */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={handlePause}>⏸ Pause</button>
        <button onClick={clearSession}>🗑 Clear</button>
      </div>
    </div>
  );
}