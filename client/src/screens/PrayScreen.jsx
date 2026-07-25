import { useState } from "react";
import playlistController from "../core/playlistController";
import { loadFirebasePlaylist } from "../firebasePlaylistScanner";

export default function PrayScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const day = new Date().getDay();

  const guidance = {
    0: {
      day: "Sunday",
      focus: "Surya – Energy & Clarity",
      mantra: "Om Suryaya Namaha",
      message: "Reset your energy and focus on clarity.",
      reflection: "What do I need clarity on this week?",
      folder: "aarti",
      match: "uniserval",
      theme: "linear-gradient(135deg, #ffb347, #ffcc33)",
    },
    1: {
      day: "Monday",
      focus: "Shiva – Calm & Stillness",
      mantra: "Om Namah Shivaya",
      message: "Let go of stress and return to peace.",
      reflection: "What am I holding onto unnecessarily?",
      folder: "aarti",
      match: "shiv",
      theme: "linear-gradient(135deg, #1c1c1c, #434343)",
    },
    2: {
      day: "Tuesday",
      focus: "Hanuman – Strength & Courage",
      mantra: "Om Hanumate Namaha",
      message: "Face challenges with courage and discipline.",
      reflection: "Where do I need strength today?",
      folder: "aarti",
      match: "hanuman",
      theme: "linear-gradient(135deg, #ff4e50, #f9d423)",
    },
    3: {
      day: "Wednesday",
      focus: "Ganesha – Wisdom & Flow",
      mantra: "Om Gan Ganapataye Namaha",
      message: "Remove obstacles and gain clarity.",
      reflection: "What is blocking my progress?",
      folder: "aarti",
      match: "ganesh",
      theme: "linear-gradient(135deg, #43cea2, #185a9d)",
    },
    4: {
      day: "Thursday",
      focus: "Guru – Guidance & Learning",
      mantra: "Om Namo Bhagavate Vasudevaya",
      message: "Stay open to wisdom and guidance.",
      reflection: "Who is guiding me right now?",
      folder: "bhajan",
      match: "gurucharanan",
      theme: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    },
    5: {
      day: "Friday",
      focus: "Lakshmi – Abundance & Gratitude",
      mantra: "Om Shreem Mahalakshmiyei Namaha",
      message: "Focus on gratitude and abundance.",
      reflection: "What am I grateful for today?",
      folder: "aarti",
      match: "luxmi",
      theme: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
    6: {
      day: "Saturday",
      focus: "Shani – Discipline & Karma",
      mantra: "Om Sham Shanicharaya Namaha",
      message: "Stay grounded and disciplined.",
      reflection: "Where do I need structure?",
      folder: "aarti",
      match: "uniserval",
      theme: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    },
  };

  const today = guidance[day] || guidance[1];

  const playTodayPrayer = async () => {
    if (loading) return;

    setLoading(true);
    setMessage("");

    const tracks = await loadFirebasePlaylist(today.folder);

    if (!tracks.length) {
      setMessage("Today's prayer audio could not be loaded.");
      setLoading(false);
      return;
    }

    const matchedTrack =
      tracks.find((track) =>
        track.title.toLowerCase().includes(today.match.toLowerCase())
      ) || tracks[0];

    playlistController.load([matchedTrack], 0);

    setMessage(`Now playing: ${matchedTrack.title}`);
    setLoading(false);
  };

  const stopPrayer = () => {
    playlistController.stop();
    setMessage("Prayer stopped.");
  };

  return (
    <div style={{ ...styles.container, background: today.theme }}>
      <div style={styles.header}>
        <h2 style={styles.day}>🕉️ {today.day}</h2>
        <p style={styles.focus}>{today.focus}</p>
      </div>

      <div style={styles.player}>
        <p style={styles.mantra}>{today.mantra}</p>

        <p style={styles.playerHint}>
          Today's prayer plays through the shared devotional player.
        </p>

        <div style={styles.controls}>
          <button
            type="button"
            onClick={playTodayPrayer}
            style={styles.playBtn}
            disabled={loading}
          >
            {loading ? "Loading..." : "▶ Play Today's Prayer"}
          </button>

          <button
            type="button"
            onClick={stopPrayer}
            style={styles.resetBtn}
          >
            ■ Stop
          </button>
        </div>

        {message && <p style={styles.status}>{message}</p>}
      </div>

      <div style={styles.card}>
        <h3>Daily Guidance</h3>
        <p>{today.message}</p>
      </div>

      <div style={styles.card}>
        <h3>My Conversations with GOD</h3>
        <p>{today.reflection}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: 18,
    color: "#fff",
    transition: "all 0.4s ease-in-out",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  header: {
    textAlign: "center",
  },

  day: {
    fontSize: 26,
    fontWeight: "bold",
  },

  focus: {
    fontSize: 14,
    opacity: 0.8,
  },

  player: {
    background: "rgba(0,0,0,0.35)",
    borderRadius: 18,
    padding: 18,
    textAlign: "center",
    backdropFilter: "blur(12px)",
  },

  mantra: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  playerHint: {
    fontSize: 13,
    opacity: 0.8,
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },

  playBtn: {
    background: "#1DB954",
    border: "none",
    padding: "10px 18px",
    borderRadius: 999,
    fontWeight: "bold",
    cursor: "pointer",
    color: "#000",
  },

  resetBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    padding: "10px 18px",
    borderRadius: 999,
    color: "#fff",
    cursor: "pointer",
  },

  status: {
    marginTop: 12,
    fontSize: 13,
  },

  card: {
    background: "rgba(0,0,0,0.25)",
    padding: 14,
    borderRadius: 14,
  },
};
