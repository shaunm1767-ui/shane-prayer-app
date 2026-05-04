export default function HomeScreen() {
  return (
    <div style={{ padding: 16 }}>
      <h2>👋 Welcome back</h2>

      <div style={cardStyle}>
        <h3>▶ Continue Listening</h3>
        <p style={subText}>Resume your last prayer</p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 16,
  borderRadius: 12,
  marginTop: 12,
};

const subText = {
  color: "#666",
  fontSize: 14,
};