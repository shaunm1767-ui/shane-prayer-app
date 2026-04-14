import React, { useEffect, useRef, useState } from "react";
import { loadPlaylist } from "./utils/loadPlaylist";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);

  const audioRef = useRef(null);

  // Load playlist once
  useEffect(() => {
    const init = async () => {
      const data = await loadPlaylist("aarti");
      setTracks(data);
      console.log("📦 Playlist loaded:", data);
    };

    init();
  }, []);

  // Initialize audio engine once
  useEffect(() => {
    audioRef.current = new Audio();

    audioRef.current.addEventListener("ended", () => {
      handleNext();
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [tracks]);

  const playTrack = (index) => {
    if (!tracks.length) return;

    const track = tracks[index];
    if (!track) return;

    audioRef.current.src = track.url;
    audioRef.current.play();

    setCurrentIndex(index);
    setIsPlaying(true);

    console.log("▶ Playing:", track.title);
  };

  const togglePlayPause = () => {
    if (!tracks.length) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        playTrack(currentIndex);
      } else {
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!tracks.length) return;

    let nextIndex = currentIndex + 1;

    if (nextIndex >= tracks.length) {
      nextIndex = loop ? 0 : currentIndex; // stop OR loop
    }

    if (nextIndex !== currentIndex) {
      playTrack(nextIndex);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (!tracks.length) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = 0;

    playTrack(prevIndex);
  };

  return (
    <div style={styles.container}>
      <h1>🕉 Prayer Player v2</h1>

      {/* MAIN PLAYER CARD */}
      <div style={styles.playerCard}>
        <h2>
          {tracks[currentIndex]?.title || "Loading..."}
        </h2>

        <div style={styles.controls}>
          <button onClick={handlePrev}>⏮</button>

          <button onClick={togglePlayPause} style={styles.playBtn}>
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button onClick={handleNext}>⏭</button>
        </div>

        <button
          onClick={() => setLoop(!loop)}
          style={{
            marginTop: 10,
            background: loop ? "green" : "gray",
            color: "white",
            padding: 8,
            borderRadius: 6,
          }}
        >
          🔁 Loop: {loop ? "ON" : "OFF"}
        </button>
      </div>

      {/* PLAYLIST */}
      <div style={{ marginTop: 30 }}>
        {tracks.map((t, i) => (
          <div
            key={i}
            onClick={() => playTrack(i)}
            style={{
              padding: 10,
              margin: 5,
              cursor: "pointer",
              background: i === currentIndex ? "#d4f7d4" : "#f2f2f2",
              borderRadius: 6,
            }}
          >
            {i === currentIndex ? "▶ " : ""}{t.title}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    textAlign: "center",
    fontFamily: "Arial",
  },
  playerCard: {
    padding: 20,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "inline-block",
    minWidth: 300,
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  playBtn: {
    padding: "10px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: 8,
  },
};

export default App;