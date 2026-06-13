import Card from "../components/Card";

export default function SettingsScreen() {
  return (
    <div style={{ padding: 20 }}>
      <h1>⚙️ Settings</h1>

      <Card>
        <h3>Appearance</h3>
        <p>Dark mode coming soon.</p>
      </Card>

      <Card>
        <h3>About</h3>
        <p>Shane Prayer App v5 Safe Upgrade.</p>
      </Card>
    </div>
  );
}