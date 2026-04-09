import React from "react";

function App() {
  const playAudio = () => {
    const audio = new Audio(
      "https://firebasestorage.googleapis.com/v0/b/shane-storage-90931.firebasestorage.app/o/aarti%2Fshane_Jaiambegauri_arthi.mp3?alt=media&token=423af3bb-a31d-483b-81f7-dc1123d1a5ca"
    );

    audio.play()
      .then(() => {
        console.log("✅ Audio playing");
      })
      .catch((err) => {
        console.error("❌ PLAY ERROR:", err);
      });
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🕉 Shane Prayer App</h1>

      <button
        onClick={playAudio}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white"
        }}
      >
        ▶ Play Aarti
      </button>
    </div>
  );
}

export default App;