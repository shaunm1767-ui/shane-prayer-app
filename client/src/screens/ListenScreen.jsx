export default function ListenScreen() {
  return (
    <div style={styles.container}>
      <h2>Listen</h2>

      <div style={styles.card}>
        <p>Featured Tracks</p>
      </div>

      <div style={styles.card}>
        <p>Recent Plays</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    color: "#fff",
  },
  card: {
    padding: 12,
    marginTop: 10,
    background: "#1a1a1a",
    borderRadius: 10,
  },
};