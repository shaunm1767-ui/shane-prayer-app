import React, { useEffect, useRef } from "react";
import { loadPlaylist } from "../utils/loadPlaylist";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const data = await loadPlaylist("aarti");
      console.log("Loaded playlist:", data);
    };

    load();
  }, []);

  const playAudio = async (url) => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(url);
      } else {
        audioRef.current.src = url;
      }

      await audioRef.current.play();
      console.log("✅ Playing:", url);
    } catch (err) {
      console.error("❌ PLAY ERROR:", err);
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🕉 Shane Prayer App</h1>

      <button
  onClick={() => {
    if (!tracks.length) return;
    playAudio(tracks[0]);
  }}
>
  ▶ Play First Track
</button>
        style={{
          padding: "15px 30px",
          fontSize: 18,
          background: "green",
          color: "white",
          border: "none",
          borderRadius: 10,
        }}
      >
        ▶ Play Aarti
      </button>
    </div>
  );
}

export default App;