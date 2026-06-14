export default function NowPlayingBar() {
  return (
    <div style={styles.container}>
      <div style={styles.trackInfo}>
        <div style={styles.artwork}>
          🎵
        </div>

        <div style={styles.text}>
          <div style={styles.title}>
            No track playing
          </div>

          <div style={styles.subtitle}>
            Select a devotional track
          </div>
        </div>
      </div>

      <div style={styles.controls}>
        <button style={styles.button}>
          ▶
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