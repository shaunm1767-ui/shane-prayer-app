import playlistController from "../core/playlistController";

export default function NowPlayingBar() {
  const current = playlistController.getCurrent?.();

  if (!current) return null;

  return (
    <div style={styles.bar}>
      <div>
        <div style={styles.title}>Now Playing</div>
        <div style={styles.sub}>
          {current?.split("/").pop()}
        </div>
      </div>

      <div style={styles.actions}>
        <button onClick={() => playlistController.pause()}>⏸</button>
        <button onClick={() => playlistController.next?.()}>⏭</button>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    height: 64,
    margin: "0 10px 10px 10px",
    borderRadius: 14,
    background: "rgba(24,24,24,0.92)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 12px",
    border: "1px solid #2a2a2a",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  title: {
    fontSize: 12,
    fontWeight: 600,
  },

  sub: {
    fontSize: 10,
    opacity: 0.6,
  },

  actions: {
    display: "flex",
    gap: 8,
  },
};