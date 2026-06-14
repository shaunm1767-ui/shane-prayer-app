import playlistController from "../core/playlistController";

export default function ListenScreen() {
  const playlists = [
    {
      title: "Morning Prayers",
      subtitle: "Start your day grounded",
      tracks: ["/audio/track1.mp3", "/audio/track2.mp3"],
    },
    {
      title: "Meditation",
      subtitle: "Calm & reflection",
      tracks: ["/audio/track2.mp3", "/audio/track3.mp3"],
    },
    {
      title: "Bhajans",
      subtitle: "Devotional music collection",
      tracks: ["/audio/track1.mp3"],
    },
  ];

  const playPlaylist = (tracks) => {
    playlistController.load(tracks, 0);
    playlistController.play(0);
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h2 style={styles.header}>🎧 Listen</h2>

      <p style={styles.subtext}>
        Choose a devotional collection to begin
      </p>

      {/* CATEGORY LIST */}
      <div style={styles.grid}>
        {playlists.map((list, index) => (
          <div
            key={index}
            onClick={() => playPlaylist(list.tracks)}
            style={styles.card}
          >
            <h3 style={styles.title}>{list.title}</h3>

            <p style={styles.subtitle}>{list.subtitle}</p>

            <div style={styles.playBtn}>
              ▶ Play
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    color: "#fff",
  },

  header: {
    fontSize: 22,
    marginBottom: 4,
  },

  subtext: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 16,
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  card: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: 14,
    cursor: "pointer",
    transition: "0.2s ease",
  },

  title: {
    fontSize: 16,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 10,
  },

  playBtn: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 8,
    background: "#1DB954",
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
};