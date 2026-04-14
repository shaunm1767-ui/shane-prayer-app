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
        onClick={() =>
          playAudio(
            "https://firebasestorage.googleapis.com/v0/b/shane-storage-90931.firebasestorage.app/o/aarti%2Fshane_Jaiambegauri_arthi.mp3?alt=media&token=423af3bb-a31d-483b-81f7-dc1123d1a5ca"
          )
        }
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