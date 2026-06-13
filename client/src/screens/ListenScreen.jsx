import Card from "../components/Card";

export default function ListenScreen() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🎧 Listen</h1>

      <Card>
        <h3>Morning Prayers</h3>
        <p>Start your day with prayer.</p>
      </Card>

      <Card>
        <h3>Meditation Tracks</h3>
        <p>Relax and reflect.</p>
      </Card>

      <Card>
        <h3>Bhajans</h3>
        <p>Your saved devotional music.</p>
      </Card>
    </div>
  );
}