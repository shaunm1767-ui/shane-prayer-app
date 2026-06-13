import Card from "../components/Card";

export default function PrayScreen() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🙏 Pray</h1>

      <Card>
        <h3>Prayer Requests</h3>
        <p>Submit a prayer request.</p>
      </Card>

      <Card>
        <h3>Prayer Journal</h3>
        <p>Record your reflections.</p>
      </Card>
    </div>
  );
}