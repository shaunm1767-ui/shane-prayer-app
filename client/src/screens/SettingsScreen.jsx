export default function SettingsScreen() {
  return (
    <div style={styles.container}>
      <h2>Settings</h2>

      <div style={styles.card}>
        <p>Audio Settings</p>
      </div>

      <div style={styles.card}>
        <p>App Preferences</p>
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