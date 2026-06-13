export default function SupportScreen() {
  return (
    <div style={styles.container}>
      <h2>Support</h2>

      <div style={styles.card}>
        <p>Help Center</p>
      </div>

      <div style={styles.card}>
        <p>Contact Us</p>
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