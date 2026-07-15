import { useEffect, useState } from "react";
import playlistController from "../core/playlistController";
import { loadFirebasePlaylist } from "../firebasePlaylistScanner";

export default function HomeScreen() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTracks() {
      setLoading(true);
      setLoadError("");

      const tracks = await loadFirebasePlaylist("aarti");

      if (!active) return;

      setPlaylist(tracks);
      setLoading(false);

      if (!tracks.length) {
        setLoadError("No devotional tracks were found.");
      }
    }

    loadTracks();

    return () => {
      active = false;
    };
  }, []);

  const playTrack = (track, index) => {
    console.log("[HOME] Playing track:", track);

    playlistController.load(playlist, index);
    setCurrentTrack(track);
  };

  const playFeatured = () => {
    if (!playlist.length) return;
    playTrack(playlist[0], 0);
  };

  const pause = (event) => {
    event.stopPropagation();
    playlistController.pause();
  };

  const clear = (event) => {
    event.stopPropagation();
    playlistController.clear();
    setCurrentTrack(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h2 style={styles.title}>Good Evening</h2>
        <p style={styles.subtitle}>
          Welcome back to your devotional space
        </p>
      </div>

      <div style={styles.featured}>
        <h3>Featured Prayer</h3>
        <p>Start your day with calm reflection and grounding.</p>

        <button
          style={styles.primaryBtn}
          onClick={playFeatured}
          disabled={loading || !playlist.length}
        >
          {loading ? "Loading prayers..." : "▶ Play Featured"}
        </button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Playlist</h3>

        {loadError && (
          <p style={styles.error}>{loadError}</p>
        )}

        {playlist.map((track, index) => {
          const active = currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              onClick={() => playTrack(track, index)}
              style={{
                ...styles.trackCard,
                background: active ? "#2a2a2a" : "#1a1a1a",
                borderColor: active ? "#1DB954" : "#2f2f2f",
              }}
            >
              <div>
                🎵 {track.title}
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

  error: {
    color: "#ff8a8a",
    fontSize: 13,
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
