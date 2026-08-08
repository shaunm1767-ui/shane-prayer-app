import { signOut } from "firebase/auth";
import Card from "../components/Card";
import { auth } from "../firebase";

export default function SettingsScreen() {
  const supportEmail = "punditshanesatsang@gmail.com";

  const openGmail = (subject, body) => {
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
  const shareData = {
    title: "Shane Prayer",
    text: "Join us for daily prayer, devotional music and spiritual guidance.",
    url: "https://shane-prayer-app-2026-f2a3e.web.app",
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Shane Prayer link copied.");
    }
  } catch (error) {
    console.error("Share failed:", error);
  }
};

const handleDonate = () => {
    openGmail(
      "I'd like to support the Shane Prayer App",
      "Namaste,\n\nI'd like to support the Shane Prayer App.\n\nPlease send me more information about how I can contribute.\n"
    );
  };

  const handleSponsor = () => {
    openGmail(
      "I'd like to sponsor the Shane Prayer App",
      "Namaste,\n\nI'm interested in sponsoring the Shane Prayer App.\n\nName:\nOrganisation:\nContact number:\n"
    );
  };

  const handleSuggestion = () => {
    openGmail(
      "Suggestion for the Shane Prayer App",
      "Namaste,\n\nI have the following suggestion for the Shane Prayer App:\n\n"
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.icon}>ðŸ™</div>
        <div>
          <h1 style={styles.heading}>Help Us Grow</h1>
          <p style={styles.intro}>
            Help us share prayer, devotional music and daily spiritual guidance.
          </p>
        </div>
      </div>  <Card>
    <h3>Share Shane Prayer</h3>
    <p style={styles.copy}>
      Share Shane Prayer with family, friends and your devotional community.
    </p>

    <button
      type="button"
      onClick={handleShare}
      style={styles.primaryButton}
    >
      Share the App
    </button>
  </Card>


      <Card>
        <h3>Donate</h3>
        <p style={styles.copy}>
          Help us keep the app available and support future devotional content.
        </p>

        <button
          type="button"
          onClick={handleDonate}
          style={styles.primaryButton}
        >
          Donate
        </button>
      </Card>

      <Card>
        <h3>Sponsor the App</h3>
        <p style={styles.copy}>
          Temples, businesses and individuals can sponsor future development.
        </p>

        <button
          type="button"
          onClick={handleSponsor}
          style={styles.secondaryButton}
        >
          Become a Sponsor
        </button>
      </Card>

      <Card>
        <h3>Share a Suggestion</h3>
        <p style={styles.copy}>
          Help us improve future versions of the Shane Prayer App.
        </p>

        <button
          type="button"
          onClick={handleSuggestion}
          style={styles.secondaryButton}
        >
          Send Suggestion
        </button>
      </Card>

      <Card>
        <h3>About Pundit Shane Maharaj</h3>
    <p style={styles.copy}>
      Pundit Shane Maharaj shares prayer, devotional music and spiritual
      guidance through Satsang. Shane Prayer brings that experience into a
      simple daily devotional space - helping people pause, pray, reflect
      and reconnect.
    </p>

        <button
          type="button"
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    color: "#fff",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },

  icon: {
    fontSize: 28,
    lineHeight: 1,
  },

  heading: {
    fontSize: 24,
    margin: 0,
  },

  intro: {
    marginTop: 6,
    color: "#c7c7c7",
    fontSize: 14,
    lineHeight: 1.5,
  },

  copy: {
    color: "#bdbdbd",
    fontSize: 14,
    lineHeight: 1.5,
  },

  ready: {
    color: "#1DB954",
    fontWeight: 600,
  },

  primaryButton: {
    width: "100%",
    padding: "12px 16px",
    border: "none",
    borderRadius: 10,
    background: "#d6a84b",
    color: "#111",
    fontWeight: 700,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 10,
    background: "#2a2a35",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  logoutButton: {
    width: "100%",
    marginTop: 12,
    padding: "12px 16px",
    border: "none",
    borderRadius: 10,
    background: "#8f2d2d",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
