import Card from "../components/Card";

export default function HomeScreen() {
  return (
    <div style={{ padding: 20 }}>

      <h1>🙏 Shane Prayer</h1>

      <Card>
        <h3>Continue Listening</h3>
        <p>Resume your devotional journey.</p>
        <button>Resume</button>
      </Card>

      <Card>
        <h3>Daily Prayer</h3>
        <p>
          Lord, guide my thoughts, my actions and my heart today.
        </p>
      </Card>

      <Card>
        <h3>Featured Devotion</h3>
        <p>Find peace through prayer and reflection.</p>
      </Card>

    </div>
  );
}