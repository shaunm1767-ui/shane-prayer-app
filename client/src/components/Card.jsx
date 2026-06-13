export default function Card({ children }) {
  return (
    <div style={styles.card}>
      {children}
    </div>
  );
}

const styles = {
  card: {
    background: "#1a1a22",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    border: "1px solid #2a2a35",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  },
};