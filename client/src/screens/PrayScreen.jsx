export default function PrayScreen() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pray</h2>

      <div style={styles.card}>
        <h3>Daily Focus</h3>
        <p>Simple, calm prayer space goes here.</p>
      </div>

      <div style={styles.card}>
        <h3>Quick Prayers</h3>
        <p>• Gratitude</p>
        <p>• Guidance</p>
        <p>• Strength</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  card: {
    background: "#1a1a1a",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    color: "#fff",
  },
};