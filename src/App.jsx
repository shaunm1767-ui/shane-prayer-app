import React, { useEffect, useState } from "react";
import { loadPlaylist } from "./utils/loadPlaylist";
import { usePrayerPlayer } from "./hooks/usePrayerPlayer";
import { getSpiritualMode, modePlaylistMap } from "./core/spiritualMode";

function App() {
  const [tracks, setTracks] = useState([]);
  const [mode, setMode] = useState("");

  const { play, pause, isPlaying, currentTrack } = usePrayerPlayer();

  // 1. LOAD DATA
  useEffect(() => {
    const init = async () => {
      const detectedMode = getSpiritualMode();
      setMode(detectedMode);

      const folder = modePlaylistMap[detectedMode];

      console.log("📦 Loading folder:", folder);

      const data = await loadPlaylist(folder);

      console.log("🎧 Tracks loaded:", data);

      setTracks(data);
    };

    init();
  }, []);

  // 2. HANDLE PLAY (IMPORTANT: user gesture safe)
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
        {isPlaying ? (
          <button onClick={pause}>⏸ Pause</button>
        ) : (
          <button
            onClick={() => tracks[0] && handlePlay(tracks[0])}
          >
            ▶ Play First Track
          </button>
        )}
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