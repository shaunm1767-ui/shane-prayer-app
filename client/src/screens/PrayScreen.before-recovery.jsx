import { useEffect, useRef, useState } from "react";

export default function PrayScreen() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const day = new Date().getDay();

  const guidance = {
    0: {
      day: "Sunday",
      focus: "Surya – Energy & Clarity",
      mantra: "Om Suryaya Namaha",
      message: "Reset your energy and focus on clarity.",
      reflection: "What do I need clarity on this week?",
      audio: "/audio/surya.mp3",
      theme: "linear-gradient(135deg, #ffb347, #ffcc33)",
    },
    1: {
      day: "Monday",
      focus: "Shiva – Calm & Stillness",
      mantra: "Om Namah Shivaya",
      message: "Let go of stress and return to peace.",
      reflection: "What am I holding onto unnecessarily?",
      audio: "/audio/shiva.mp3",
      theme: "linear-gradient(135deg, #1c1c1c, #434343)",
    },
    2: {
      day: "Tuesday",
      focus: "Hanuman – Strength & Courage",
      mantra: "Om Hanumate Namaha",
      message: "Face challenges with courage and discipline.",
      reflection: "Where do I need strength today?",
      audio: "/audio/hanuman.mp3",
      theme: "linear-gradient(135deg, #ff4e50, #f9d423)",
    },
    3: {
      day: "Wednesday",
      focus: "Ganesha – Wisdom & Flow",
      mantra: "Om Gan Ganapataye Namaha",
      message: "Remove obstacles and gain clarity.",
      reflection: "What is blocking my progress?",
      audio: "/audio/ganesha.mp3",
      theme: "linear-gradient(135deg, #43cea2, #185a9d)",
    },
    4: {
      day: "Thursday",
      focus: "Guru – Guidance & Learning",
      mantra: "Om Namo Bhagavate Vasudevaya",
      message: "Stay open to wisdom and guidance.",
      reflection: "Who is guiding me right now?",
      audio: "/audio/guru.mp3",
      theme: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    },
    5: {
      day: "Friday",
      focus: "Lakshmi – Abundance & Gratitude",
      mantra: "Om Shreem Mahalakshmiyei Namaha",
      message: "Focus on gratitude and abundance.",
      reflection: "What am I grateful for today?",
      audio: "/audio/lakshmi.mp3",
      theme: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
    6: {
      day: "Saturday",
      focus: "Shani – Discipline & Karma",
      mantra: "Om Sham Shanicharaya Namaha",
      message: "Stay grounded and disciplined.",
      reflection: "Where do I need structure?",
      audio: "/audio/shani.mp3",
      theme: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    },
  };

  const today = guidance[day] || guidance[1];

  // RESET STATE ON DAY CHANGE
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [day]);

  // PROGRESS SIMULATION
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const reset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div style={{ ...styles.container, background: today.theme }}>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={today.audio}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(100);
        }}
      />

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.day}>🕉️ {today.day}</h2>
        <p style={styles.focus}>{today.focus}</p>
      </div>

      {/* PLAYER CARD */}
      <div
        style={{
          ...styles.player,
          transform: isPlaying ? "scale(1.02)" : "scale(1)",
          boxShadow: isPlaying
            ? "0 0 25px rgba(29,185,84,0.3)"
            : "none",
        }}
      >
        <p style={styles.mantra}>{today.mantra}</p>

        {/* PROGRESS BAR */}
        <div style={styles.progressWrap}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>

        <p style={styles.percent}>{progress}%</p>

        <div style={styles.controls}>
          <button onClick={togglePlay} style={styles.playBtn}>
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button onClick={reset} style={styles.resetBtn}>
            ↺ Reset
          </button>
        </div>
      </div>

      {/* GUIDANCE */}
      <div style={styles.card}>
        <h3>Daily Guidance</h3>
        <p>{today.message}</p>
      </div>

      {/* REFLECTION */}
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
    transition: "all 0.3s ease",
  },

  mantra: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  progressWrap: {
    height: 6,
    background: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 10,
  },

  progressBar: {
    height: "100%",
    background: "#1DB954",
    transition: "width 1s linear",
  },

  percent: {
    fontSize: 12,
    marginTop: 6,
    opacity: 0.8,
  },

  controls: {
    display: "flex",
    justifyContent: "center",
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

  card: {
    background: "rgba(0,0,0,0.25)",
    padding: 14,
    borderRadius: 14,
  },
};