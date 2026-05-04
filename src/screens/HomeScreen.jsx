import React from "react";
import audioEngine from "../audioEngine.js";

export default function HomeScreen() {
  console.log("HOME SCREEN LOADED");

  const handlePlay = () => {
    console.log("CLICKED PLAY");

    // safe default track (adjust later if dynamic)
    audioEngine.play("/audio/track1.mp3");
  };

  const handlePause = () => {
    console.log("CLICKED PAUSE");
    audioEngine.pause();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HOME</h1>

      <p style={styles.subtitle}>
        Welcome back — Continue Listening
      </p>

      <button style={styles.playButton} onClick={handlePlay}>
        ▶ Play Audio
      </button>

      <button style={styles.pauseButton} onClick={handlePause}>
        ⏸ Pause
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    color: "#666",
  },
  playButton: {
    padding: 10,
    marginRight: 10,
    cursor: "pointer",
  },
  pauseButton: {
    padding: 10,
    cursor: "pointer",
  },
};