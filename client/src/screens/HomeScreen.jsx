import { useEffect, useState } from "react";
import playlistController from "../core/playlistController";

export default function HomeScreen() {
  const [currentTrack, setCurrentTrack] = useState(null);

  const playlist = [
    "/audio/track1.mp3",
    "/audio/track2.mp3",
    "/audio/track3.mp3",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("lastTrack");
    if (saved) setCurrentTrack(saved);
  }, []);

  const playTrack = (track, index) => {
    playlistController.load(playlist, index);
    playlistController.play(index);

    setCurrentTrack(track);
  };

  const pause = () => playlistController.pause();

  const clear = () => {
    localStorage.clear();
    playlistController.clear();
    setCurrentTrack(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>HOME</h2>

      <h3>Playlist</h3>

      {playlist.map((track, index) => (
        <div
          key={track}
          onClick={() => playTrack(track, index)}
          style={{
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
            background: currentTrack === track ? "#dff3ff" : "#fff",
            cursor: "pointer",
          }}
        >
          🎵 Track {index + 1}
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={pause}>⏸ Pause</button>
        <button onClick={clear}>🗑 Clear</button>
      </div>
    </div>
  );
}