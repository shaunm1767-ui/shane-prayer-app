import Card from "../components/Card";

export default function SupportScreen() {
  return (
    <div style={{ padding: 20 }}>
      <h1>❤️ Support</h1>

      <Card>
        <h3>Donate</h3>
        <p>Help keep this ministry growing.</p>
      </Card>

      <Card>
        <h3>Contact Us</h3>
        <p>Reach out for support.</p>
      </Card>
    </div>
  );
}