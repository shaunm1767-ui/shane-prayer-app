import { signOut } from "firebase/auth";
import Card from "../components/Card";
import { auth } from "../firebase";

export default function SettingsScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>⚙️ Settings</h1>

      <Card>
        <h3>App Version</h3>
        <p>Shane Prayer App MVP v1</p>
      </Card>

      <Card>
        <h3>Firebase</h3>
        <p style={styles.ready}>● Connected</p>
      </Card>

      <Card>
        <h3>Audio Engine</h3>
        <p style={styles.ready}>● Ready</p>
      </Card>

      <Card>
        <h3>Account</h3>

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

  heading: {
    marginBottom: 18,
  },

  ready: {
    color: "#1DB954",
    fontWeight: 600,
  },

  logoutButton: {
    width: "100%",
    padding: "12px 16px",
    border: "none",
    borderRadius: 10,
    background: "#b3261e",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};