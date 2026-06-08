import React, { useEffect } from "react";

import audioEngine from "./audioEngine";
import { playlist } from "./playlist";
import { loadFirebasePlaylist } from "./firebasePlaylistScanner";

export default function Home() {

  useEffect(() => {
    audioEngine.setPlaylist(playlist);

    loadFirebasePlaylist()
      .then((list) => {
        if (list && list.length > 0) {
          audioEngine.setPlaylist(list);
        }
      })
      .catch((err) => {
        console.log("Firebase playlist error:", err);
      });

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