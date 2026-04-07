export default function Player() {
  const audioUrl =
    "https://firebasestorage.googleapis.com/v0/b/shane-prayer-app-2026.firebasestorage.app/o/jai%20ganesh%208%20names.mp3?alt=media&token=847ecdab-8e23-496c-9e39-98f830cbaa8b";

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Prayer Audio</h3>

      <audio controls style={{ width: "100%" }}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
}