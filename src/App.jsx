import React, { useEffect, useState } from "react";
import { loadPlaylist } from "./utils/loadPlaylist";
import { usePrayerPlayer } from "./hooks/usePrayerPlayer";
import { getSpiritualMode, modePlaylistMap } from "./core/spiritualMode";

// ✅ Firebase (CLEAN)
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [tracks, setTracks] = useState([]);
  const [mode, setMode] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    play,
    pause,
    next,
    prev,
    isPlaying,
    currentTrack,
    setTracks: loadTracks,
  } = usePrayerPlayer();

  // -----------------------------
  // LOGIN PERSISTENCE
  // -----------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ Logged in:", currentUser.email);
        setUser(currentUser);
      } else {
        console.log("❌ Not logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // -----------------------------
  // LOAD PLAYLIST
  // -----------------------------
  useEffect(() => {
    const init = async () => {
      try {
        const detectedMode = getSpiritualMode();
        setMode(detectedMode);

        const folder = modePlaylistMap[detectedMode];

        console.log("📦 Loading folder:", folder);

        const data = await loadPlaylist(folder);

        console.log("🎧 Tracks loaded:", data);

        if (!data || data.length === 0) {
          console.warn("⚠️ No tracks found");
          return;
        }

        setTracks(data);
        loadTracks(data);
      } catch (err) {
        console.error("❌ Init error:", err);
      }
    };

    init();
  }, [loadTracks]);

  // -----------------------------
  // AUTH FUNCTIONS
  // -----------------------------
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login success");
    } catch (err) {
      console.error("❌ Login error:", err.message);
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // -----------------------------
  // PLAYER
  // -----------------------------
  const handlePlay = (track) => {
    if (!track || !track.url) {
      console.warn("⚠️ Invalid track");
      return;
    }
    play(track);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={styles.container}>
      <h1>🕉 Prayer App</h1>

      <h3>Mode: {mode}</h3>

      {/* LOGIN BOX */}
      <div style={styles.userBox}>
        {user ? (
          <>
            <p>👤 {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <input
              style={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>

      {/* NOW PLAYING */}
      {currentTrack && (
        <div style={styles.nowPlaying}>
          🎧 Now Playing: {currentTrack.title}
        </div>
      )}

      {/* CONTROLS */}
      <div style={styles.controls}>
        <button onClick={prev}>⏮ Prev</button>

        {isPlaying ? (
          <button onClick={pause}>⏸ Pause</button>
        ) : (
          <button
            onClick={() =>
              currentTrack
                ? handlePlay(currentTrack)
                : tracks[0] && handlePlay(tracks[0])
            }
          >
            ▶ Play
          </button>
        )}

        <button onClick={next}>⏭ Next</button>
      </div>

      {/* TRACK LIST */}
      <div style={styles.list}>
        {tracks.length === 0 && <p>Loading prayers...</p>}

        {tracks.map((t, i) => (
          <div
            key={i}
            style={styles.item}
            onClick={() => handlePlay(t)}
          >
            🪔 {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------
// STYLES
// -----------------------------
const styles = {
  container: {
    textAlign: "center",
    padding: 30,
    fontFamily: "Arial",
    background: "#f7f3ea",
    minHeight: "100vh",
  },
  userBox: {
    marginBottom: 15,
  },
  input: {
    display: "block",
    margin: "5px auto",
    padding: 8,
    width: 200,
  },
  nowPlaying: {
    margin: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  controls: {
    margin: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 12,
    margin: 8,
    background: "white",
    borderRadius: 10,
    cursor: "pointer",
  },
};

export default App;