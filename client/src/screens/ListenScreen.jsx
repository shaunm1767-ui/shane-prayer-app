import playlistController from "../core/playlistController";

export default function ListenScreen() {
  const playlist = [
    "/audio/track1.mp3",
    "/audio/track2.mp3",
    "/audio/track3.mp3",
  ];

  const play = (track, index) => {
    playlistController.load(playlist, index);
    playlistController.play(index);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Listen</h2>

      {playlist.map((track, i) => (
        <div
          key={track}
          onClick={() => play(track, i)}
          style={styles.card}
        >
          🎵 Track {i + 1}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    background: "#1a1a1a",
    cursor: "pointer",
  },
};