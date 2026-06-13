import { useState } from "react";

export default function HomeScreen({ onPlay, currentTrack }) {
  const playlist = [
    "/audio/track1.mp3",
    "/audio/track2.mp3",
    "/audio/track3.mp3",
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handlePlay = (track, index) => {
    setActiveIndex(index);

    if (onPlay) {
      onPlay(track);
    } else {
      console.warn("onPlay not connected from AppShell");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HOME</h1>

      <div style={styles.section}>
        <h3>Playlist</h3>

        {playlist.map((track, index) => (
          <div
            key={track}
            onClick={() => handlePlay(track, index)}
            style={{
              ...styles.track,
              background:
                activeIndex === index ? "#1a1a22" : "#121218",
              border:
                currentTrack === track
                  ? "1px solid #1db954"
                  : "1px solid #2a2a35",
            }}
          >
            🎵 Track {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    marginBottom: 16,
  },

  section: {
    marginTop: 10,
  },

  track: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    cursor: "pointer",
    transition: "0.2s",
  },
};