import React, { useEffect, useState } from "react";
import { loadPlaylist } from "./utils/loadPlaylist";
import { usePrayerPlayer } from "./hooks/usePrayerPlayer";
import { getSpiritualMode, modePlaylistMap } from "./core/spiritualMode";

function App() {
  const [tracks, setTracks] = useState([]);
  const [mode, setMode] = useState("");

  const {
    play,
    pause,
    next,
    prev,
    isPlaying,
    currentTrack,
    setTracks: loadTracks, // IMPORTANT: hook alias fix
  } = usePrayerPlayer();

  // -----------------------------
  // INIT LOAD
  // -----------------------------
  useEffect(() => {
    const init = async () => {
      try {
        const detectedMode = getSpiritualMode();
        setMode(detectedMode);

        const folder = modePlaylistMap[detectedMode];

        console.log("📦 Loading folder:", folder);

        const data = await loadPlaylist(folder);

        console.log("🎧 Tracks loaded:", data);

        setTracks(data);
        loadTracks(data); // 🔥 correct hook call (NO load(), NO crash)
      } catch (err) {
        console.error("❌ Init error:", err);
      }
    };

    init();
  }, [loadTracks]);

  // -----------------------------
  // PLAY HANDLER
  // -----------------------------
  const handlePlay = (track) => {
    if (!track?.url) return;
    play(track);
  };

  return (
    <div style={styles.container}>
      <h1>🕉 Prayer App - Spiritual Mode</h1>

      <h3>Mode: {mode}</h3>

      {/* NOW PLAYING */}
      {currentTrack && (
        <div style={styles.nowPlaying}>
          🎧 Now Playing: {currentTrack.title}
        </div>
      )}

      {/* CONTROLS */}
      <div style={styles.controls}>
        <button onClick={prev}>⏮ Prev</button>

        {isPlaying ? (
          <button onClick={pause}>⏸ Pause</button>
        ) : (
          <button onClick={() => tracks[0] && handlePlay(tracks[0])}>
            ▶ Play
          </button>
        )}

        <button onClick={next}>⏭ Next</button>
      </div>

      {/* TRACK LIST */}
      <div style={styles.list}>
        {tracks.length === 0 && <p>Loading prayers...</p>}

        {tracks.map((t, i) => (
          <div
            key={i}
            style={styles.item}
            onClick={() => handlePlay(t)}
          >
            🪔 {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------
// STYLES
// -----------------------------
const styles = {
  container: {
    textAlign: "center",
    padding: 30,
    fontFamily: "Arial",
    background: "#f7f3ea",
    minHeight: "100vh",
  },
  nowPlaying: {
    margin: 15,
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  controls: {
    margin: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 12,
    margin: 8,
    background: "white",
    borderRadius: 10,
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
};

export default App;