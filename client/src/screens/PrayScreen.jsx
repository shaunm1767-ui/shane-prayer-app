import { useState } from "react";
import playlistController from "../core/playlistController";
import { loadFirebasePlaylist } from "../firebasePlaylistScanner";

export default function PrayScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const realDay = new Date().getDay();
const [devDay, setDevDay] = useState(realDay);
const day = devDay;

  const guidance = {
    0: {
      day: "Sunday",
hindiDay: "रविवार",
      image: "/images/deities/sunday-surya.png",
      focus: "Surya – Energy & Clarity",
      mantra: "Om Suryaya Namaha",
      message: "Reset your energy and focus on clarity.",
      reflection: "May I enter this week with clarity, positive energy and purpose.",
      folder: "aarti",
      match: "uniserval",
      theme: "linear-gradient(135deg, #ffb347, #ffcc33)",
    },
    1: {
     day: "Monday",
hindiDay: "सोमवार",
      image: "/images/deities/monday-shiva.png",
      focus: "Shiva – Calm & Stillness",
      mantra: "Om Namah Shivaya",
      message: "Let go of stress and return to peace.",
      reflection: "May Lord Shiva always protect me, my family and bring peace into our lives.",
      folder: "aarti",
      match: "shiv",
      theme: "linear-gradient(135deg, #1c1c1c, #434343)",
    },
    2: {
     day: "Tuesday",
hindiDay: "मंगलवार",
      image: "/images/deities/tuesday-hanuman.png",
      focus: "Hanuman – Strength & Courage",
      mantra: "Om Hanumate Namaha",
      message: "Face challenges with courage and discipline.",
      reflection: "May I always have the courage and strength to face whatever comes my way.",
      folder: "aarti",
      match: "hanuman",
      theme: "linear-gradient(135deg, #ff4e50, #f9d423)",
    },
    3: {
      day: "Wednesday",
hindiDay: "बुधवार",
      image: "/images/deities/wednesday-ganesha.png",
      focus: "Ganesha – Wisdom & Flow",
      mantra: "Om Gan Ganapataye Namaha",
      message: "Remove obstacles and gain clarity.",
      reflection: "May obstacles be removed from my path and may I move forward with wisdom and confidence.",
      folder: "aarti",
      match: "ganesh",
      theme: "linear-gradient(135deg, #43cea2, #185a9d)",
    },
    4: {
      day: "Thursday",
hindiDay: "गुरुवार",
      image: "/images/deities/thursday-vishnu.png",
      focus: "Guru – Guidance & Learning",
      mantra: "Om Namo Bhagavate Vasudevaya",
      message: "Stay open to wisdom and guidance.",
      reflection: "May I always recognise the guidance, wisdom and blessings placed before me.",
      folder: "bhajan",
      match: "gurucharanan",
      theme: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    },
    5: {
      day: "Friday",
hindiDay: "शुक्रवार",
      image: "/images/deities/friday-lakshmi.png",
      focus: "Lakshmi – Abundance & Gratitude",
      mantra: "Om Shreem Mahalakshmiyei Namaha",
      message: "Focus on gratitude and abundance.",
      reflection: "May my home and family be blessed with abundance, gratitude, peace and happiness.",
      folder: "aarti",
      match: "luxmi",
      theme: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
    6: {
     day: "Saturday",
hindiDay: "शनिवार",
      image: "/images/deities/saturday-shani-horizontal.png",
      focus: "Shani – Discipline & Karma",
      mantra: "Om Sham Shanicharaya Namaha",
      message: "Stay grounded and disciplined.",
      reflection: "May I have the patience and discipline to do what is right and trust the journey ahead.",
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


  return (
    <div style={{ ...styles.container, background: today.theme }}>


      <div style={styles.devDaySwitcher}>
    {[0, 1, 2, 3, 4, 5, 6].map((d) => (
      <button
        key={d}
        type="button"
        onClick={() => setDevDay(d)}
        style={{
          ...styles.devDayButton,
          ...(day === d ? styles.devDayButtonActive : {}),
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]}
      </button>
    ))}
  </div>

  <div style={styles.imageWrap}>
        <img
          src={today.image}
          alt={`${today.day} devotional deity`}
          style={styles.deityImage}
        />

        {day === 0 && (
          <div style={styles.tyagOverlay}>
            <div style={styles.tyagTitle}>TYAG</div>
            <div style={styles.tyagMeaning}>Thank You All Good</div>
          </div>
        )}
      </div>

     <div style={styles.controls}>
  <button
    type="button"
    onClick={playTodayPrayer}
    style={styles.playBtn}
    disabled={loading}
  >
    {loading ? "Loading..." : "▶ Play Today's Prayer"}
  </button>
</div>

{message && <p style={styles.status}>{message}</p>}

    

      <div style={styles.card}>
        <h3>REFLECTION</h3>
        <p>{today.reflection}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "18px 14px 230px",
    color: "#fff",
    transition: "all 0.4s ease-in-out",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  header: {
    textAlign: "center",
  },
hindiDay: {
  marginBottom: 2,
  color: "#FFE39A",
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.1,
},
 devDaySwitcher: {
  width: "100%",
  maxWidth: 430,
  alignSelf: "center",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 4,
  marginBottom: 8,
},

devDayButton: {
  padding: "7px 2px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(0,0,0,0.28)",
  color: "#fff",
  fontSize: 11,
  cursor: "pointer",
},

devDayButtonActive: {
  background: "#d6a84b",
  color: "#111",
  fontWeight: 700,
},

imageWrap: {
  width: "100%",
  maxWidth: 430,
  position: "relative",
  alignSelf: "center",
},

tyagOverlay: {
  position: "absolute",
  left: "2.2%",
  right: "2.2%",
  bottom: "2.5%",
  height: "13.2%",
  boxSizing: "border-box",
  borderRadius: 12,
  border: "1px solid rgba(255,190,45,0.85)",
  background: "linear-gradient(135deg, #651010, #3d0606)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#f7cf62",
  boxShadow: "0 4px 12px rgba(0,0,0,0.32)",
},

tyagTitle: {
  fontSize: 24,
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: 4,
},

tyagMeaning: {
  marginTop: 6,
  fontSize: 13,
  color: "#fff7df",
  fontWeight: 600,
},

deityImage: {
  width: "100%",
  maxWidth: 430,
  height: "auto",
  display: "block",
  objectFit: "contain",
  alignSelf: "center",
  borderRadius: 18,
  border: "1px solid rgba(255,215,128,0.45)",
  boxShadow: "0 10px 28px rgba(0,0,0,0.42)",
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
    background: "rgba(0,0,0,0.20)",
    borderRadius: 14,
    padding: 12,
    textAlign: "center",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  mantra: {
    fontSize: 17,
    fontWeight: "bold",
    margin: "0 0 8px",
  },

  playerHint: {
    fontSize: 13,
    opacity: 0.8,
  },
controls: {
  width: "100%",
  maxWidth: 430,
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
  marginTop: 2,
},
  playBtn: {
  width: "100%",
  background: "#1DB954",
  border: "none",
  padding: "13px 18px",
  borderRadius: 999,
  fontSize: 15,
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
  width: "100%",
  maxWidth: 430,
  alignSelf: "center",
  boxSizing: "border-box",
  background: "rgba(0,0,0,0.25)",
  padding: "15px 16px",
  borderRadius: 14,
  textAlign: "center",
},











};


