import { useEffect, useState } from "react";
import playlistController from "../core/playlistController";

export default function NowPlayingBar() {
  const [playerState, setPlayerState] = useState({
    currentTrack: null,
    isPlaying: false,
  });

  useEffect(() => {
    playlistController.onChange = (state) => {
      setPlayerState({
        currentTrack: state.currentTrack || null,
        isPlaying: Boolean(state.isPlaying),
      });
    };

    return () => {
      playlistController.onChange = null;
    };
  }, []);

  const togglePlayback = () => {
    if (!playerState.currentTrack) return;
    playlistController.toggle();
  };

  const trackTitle =
    playerState.currentTrack?.title ||
    playerState.currentTrack?.name ||
    "No track playing";

  return (
    <div style={styles.container}>
      <div style={styles.trackInfo}>
        <div style={styles.artwork}>🎵</div>

        <div style={styles.text}>
          <div style={styles.title}>{trackTitle}</div>

          <div style={styles.subtitle}>
            {playerState.currentTrack
              ? playerState.isPlaying
                ? "Now playing"
                : "Paused"
              : "Select a devotional track"}
          </div>
        </div>
      </div>

      <div style={styles.controls}>
        <button
          style={{
            ...styles.button,
            opacity: playerState.currentTrack ? 1 : 0.45,
          }}
          onClick={togglePlayback}
          disabled={!playerState.currentTrack}
          aria-label={playerState.isPlaying ? "Pause" : "Play"}
        >
          {playerState.isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    left: 12,
    right: 12,
    bottom: 72,
    height: 64,
    background: "#1E1E1E",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    zIndex: 1000,
  },

  trackInfo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },

  artwork: {
    width: 42,
    height: 42,
    borderRadius: 8,
    background: "#2A2A2A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },

  text: {
    overflow: "hidden",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 12,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  controls: {
    flexShrink: 0,
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "#1DB954",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16,
  },
};
