import { useEffect, useState } from "react";
import playlistController from "../core/playlistController";

export default function NowPlayingBar() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playlistController.onIndexChange = () => {
      const track = playlistController.getCurrent?.();
      setCurrent(track);
      setPlaying(true);
    };
  }, []);

  const toggle = () => {
    if (playing) {
      playlistController.pause();
      setPlaying(false);
    } else {
      playlistController.play();
      setPlaying(true);
    }
  };

  if (!current) return null;

  return (
    <div style={styles.bar}>
      <div style={styles.info}>
        🎧 Now Playing
        <div style={styles.title}>
          {current.split("/").pop()}
        </div>
      </div>

      <button onClick={toggle} style={styles.btn}>
        {playing ? "⏸" : "▶"}
      </button>
    </div>
  );
}

const styles = {
  bar: {
    position: "fixed",
    bottom: 60,
    left: 0,
    right: 0,
    height: 60,
    background: "#111",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    borderTop: "1px solid #222",
  },
  info: {
    fontSize: 12,
    opacity: 0.8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  btn: {
    fontSize: 18,
    background: "transparent",
    color: "#fff",
    border: "none",
  },
};