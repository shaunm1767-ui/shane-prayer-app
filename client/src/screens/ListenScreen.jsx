import { useState } from "react";
import playlistController from "../core/playlistController";
import { loadFirebasePlaylist } from "../firebasePlaylistScanner";

export default function ListenScreen() {
  const [loadingFolder, setLoadingFolder] = useState("");
  const [message, setMessage] = useState("");

  const playlists = [
    {
      title: "Morning Prayers",
      subtitle: "Start your day grounded",
      folder: "aarti",
    },
    {
      title: "Meditation",
      subtitle: "Calm and reflection",
      folder: "meditation",
    },
    {
      title: "Bhajans",
      subtitle: "Devotional music collection",
      folder: "bhajan",
    },
  ];

  const playPlaylist = async (folder) => {
    if (loadingFolder) return;

    setLoadingFolder(folder);
    setMessage("");

    const tracks = await loadFirebasePlaylist(folder);

    if (!tracks.length) {
      setMessage(`No playable tracks found in ${folder}.`);
      setLoadingFolder("");
      return;
    }

    playlistController.load(tracks, 0);
    setLoadingFolder("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🎧 Listen</h2>

      <p style={styles.subtext}>
        Choose a devotional collection to begin
      </p>

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.grid}>
        {playlists.map((list) => {
          const isLoading = loadingFolder === list.folder;

          return (
            <button
              type="button"
              key={list.folder}
              onClick={() => playPlaylist(list.folder)}
              style={styles.card}
              disabled={Boolean(loadingFolder)}
            >
              <h3 style={styles.title}>{list.title}</h3>

              <p style={styles.subtitle}>{list.subtitle}</p>

              <div style={styles.playBtn}>
                {isLoading ? "Loading..." : "▶ Play"}
              </div>
            </button>
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

  header: {
    fontSize: 22,
    marginBottom: 4,
  },

  subtext: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 16,
  },

  message: {
    color: "#ffb4a9",
    fontSize: 13,
    marginBottom: 14,
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  card: {
    width: "100%",
    textAlign: "left",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: 14,
    cursor: "pointer",
    transition: "0.2s ease",
  },

  title: {
    fontSize: 16,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 10,
  },

  playBtn: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 8,
    background: "#1DB954",
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
};
