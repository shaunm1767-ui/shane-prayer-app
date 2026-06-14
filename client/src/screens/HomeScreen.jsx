import { useState } from "react";
import playlistController from "../core/playlistController";

export default function HomeScreen() {
  const [currentTrack, setCurrentTrack] = useState(null);

  const playlist = [
    "/audio/track1.mp3",
    "/audio/track2.mp3",
    "/audio/track3.mp3",
  ];

  const playTrack = (track, index) => {
    playlistController.load(playlist, index);
    playlistController.play(index);
    setCurrentTrack(track);
  };

  const pause = () => {
    playlistController.pause();
  };

  const clear = () => {
    playlistController.clear();
    setCurrentTrack(null);
  };

  return (
    <div style={styles.container}>
      {/* GREETING */}
      <div style={styles.hero}>
        <h2 style={styles.title}>Good Evening</h2>
        <p style={styles.subtitle}>
          Welcome back to your devotional space
        </p>
      </div>

      {/* FEATURED CARD */}
      <div style={styles.featured}>
        <h3>Featured Prayer</h3>
        <p>Start your day with calm reflection and grounding.</p>
        <button style={styles.primaryBtn}>
          ▶ Play Featured
        </button>
      </div>

      {/* PLAYLIST */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Playlist</h3>

        {playlist.map((track, index) => {
          const active = currentTrack === track;

          return (
            <div
              key={track}
              onClick={() => playTrack(track, index)}
              style={{
                ...styles.trackCard,
                background: active ? "#2a2a2a" : "#1a1a1a",
                borderColor: active ? "#1DB954" : "#2f2f2f",
              }}
            >
              <div>
                🎵 Track {index + 1}
              </div>

              <div style={styles.trackActions}>
                {active && (
                  <button onClick={pause} style={styles.smallBtn}>
                    ⏸
                  </button>
                )}

                <button onClick={clear} style={styles.smallBtn}>
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    color: "#fff",
  },

  hero: {
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#aaa",
  },

  featured: {
    background: "#1a1a22",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    border: "1px solid #2a2a35",
  },

  primaryBtn: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    border: "none",
    background: "#1DB954",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    marginBottom: 10,
  },

  trackCard: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #2f2f2f",
    marginBottom: 10,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    cursor: "pointer",
  },

  trackActions: {
    display: "flex",
    gap: 8,
  },

  smallBtn: {
    border: "none",
    background: "#333",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 6,
    cursor: "pointer",
  },
};