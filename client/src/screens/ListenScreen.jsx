import { useEffect, useState } from "react";
import playlistController from "../core/playlistController";

export default function ListenScreen() {
  const [state, setState] = useState({
    queue: [],
    currentIndex: 0,
    currentTrack: null,
  });

  useEffect(() => {
    playlistController.onChange = setState;
  }, []);

  const playlist = [
    "/audio/track1.mp3",
    "/audio/track2.mp3",
    "/audio/track3.mp3",
  ];

  const playTrack = (track, index) => {
    playlistController.load(playlist, index);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Listen</h1>

      <h3>Playlist</h3>

      {playlist.map((t, i) => (
        <div key={t} onClick={() => playTrack(t, i)}>
          🎵 Track {i + 1}
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => playlistController.pause()}>Pause</button>
        <button onClick={() => playlistController.next()}>Next</button>
        <button onClick={() => playlistController.previous()}>Prev</button>
      </div>
    </div>
  );
}