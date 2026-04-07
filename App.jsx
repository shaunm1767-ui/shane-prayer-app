import { useEffect, useRef } from "react";

export default function App() {
  const audioRef = useRef(null);

  // optional auto play attempt (safe fallback)
  useEffect(() => {
    const tryPlay = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Autoplay blocked (expected). User must click.");
      }
    };

    tryPlay();
  }, []);

  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Prayer App is Live</h2>

      <button onClick={playAudio} style={{ padding: "10px 20px" }}>
        ? Play Prayer
      </button>

      <div style={{ marginTop: 20 }}>
        <audio ref={audioRef} controls>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/shane-prayer-app-2026.firebasestorage.app/o/jai%20ganesh%208%20names.mp3?alt=media&token=847ecdab-8e23-496c-9e39-98f830cbaa8b"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}
