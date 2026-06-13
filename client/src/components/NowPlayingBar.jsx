export default function NowPlayingBar({ track, isPlaying, onPause }) {
  return (
    <div style={styles.bar}>
      <div style={styles.left}>
        {track ? (
          <>
            🎧 {track}
          </>
        ) : (
          "🎧 Nothing playing"
        )}
      </div>

      <div style={styles.right}>
        {track && (
          <button onClick={onPause} style={styles.btn}>
            {isPlaying ? "⏸" : "▶"}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  bar: {
    height: 60,
    background: "#1a1a22",
    borderRadius: 14,
    border: "1px solid #2a2a35",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },

  left: {
    fontSize: 13,
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  btn: {
    background: "#1db954",
    border: "none",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
  },
};