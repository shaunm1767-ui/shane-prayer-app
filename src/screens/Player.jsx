import React, { useEffect, useState } from "react";
import audioEngine from "../audioEngine";

// TEMP playlist (replace later with real playlist.js)
const playlist = [
  { id: 1, title: "Track 1", src: "/audio/track1.mp3" },
  { id: 2, title: "Track 2", src: "/audio/track2.mp3" },
  { id: 3, title: "Track 3", src: "/audio/track3.mp3" }
];

export default function Player() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    audioEngine.onIndexChange = (index) => {
      setCurrentIndex(index);
    };
  }, []);

  const playTrack = (index) => {
    audioEngine.init();
    audioEngine.loadQueue(playlist.map(t => t.src), index);
    audioEngine.play(playlist[index].src);

    setCurrentIndex(index);
    setStatus("Playing: " + playlist[index].title);
  };

  const next = () => audioEngine.next();
  const prev = () => audioEngine.previous();

  return (
    <div style={{ padding: 20 }}>
      <h2>🎧 Prayer Player</h2>

      <p>{status}</p>

      {/* Controls */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={prev}>⏮ Prev</button>
        <button onClick={next} style={{ marginLeft: 10 }}>⏭ Next</button>
      </div>

      {/* Playlist */}
      <div>
        {playlist.map((track, index) => (
          <div
            key={track.id}
            onClick={() => playTrack(index)}
            style={{
              padding: 10,
              marginBottom: 5,
              cursor: "pointer",
              background: index === currentIndex ? "#ddd" : "#f5f5f5",
              borderRadius: 6
            }}
          >
            {index + 1}. {track.title}
          </div>
        ))}
      </div>
    </div>
  );
}