import React, { useEffect } from "react";
import audioEngine from "./audioEngine";
import { playlist } from "./playlist";

export default function Home() {
  useEffect(() => {
    audioEngine.setPlaylist(playlist);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🙏 Shane Prayer App</h1>

      <p>Playlist Ready</p>

      <button onClick={() => audioEngine.playIndex(0)}>
        ▶ Play Track 1
      </button>

      <button onClick={() => audioEngine.previous()}>
        ⏮ Prev
      </button>

      <button onClick={() => audioEngine.next()}>
        ⏭ Next
      </button>
    </div>
  );
}