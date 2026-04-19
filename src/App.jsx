import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { loadPlaylist } from "./utils/loadPlaylist";
import { usePrayerPlayer } from "./hooks/usePrayerPlayer";

function App() {
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    play,
    pause,
    next,
    prev,
    playIndex,
    isPlaying,
    currentTrack,
    setTracks: loadTracks,
  } = usePrayerPlayer();

  // ---------------- AUTH ----------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // ---------------- LOAD ALL MUSIC ----------------
  useEffect(() => {
    const init = async () => {
      try {
        // 🔥 LOAD MULTIPLE FOLDERS
        const folders = ["aarti", "bhajan", "chalisa", "discourse"];

        let allTracks = [];

        for (let folder of folders) {
          const data = await loadPlaylist(folder);

          // add folder label for demo clarity
          const tagged = data.map((t) => ({
            ...t,
            title: `${folder.toUpperCase()} - ${t.title}`,
          }));

          allTracks = [...allTracks, ...tagged];
        }

        console.log("🔥 ALL TRACKS:", allTracks);

        setTracks(allTracks);
        loadTracks(allTracks);
      } catch (err) {
        console.error("Load error:", err);
      }
    };

    init();
  }, [loadTracks]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>🕉 Shane Prayer App</h1>

      {/* LOGIN */}
      <div style={{ marginBottom: 20 }}>
        {user ? (
          <>
            👤 {user.email}
            <br />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>

      {/* NOW PLAYING */}
      {currentTrack && (
        <h3>🎧 Now Playing: {currentTrack.title}</h3>
      )}

      {/* CONTROLS */}
      <div style={{ margin: 10 }}>
        <button onClick={prev}>⏮ Prev</button>

        {isPlaying ? (
          <button onClick={pause}>⏸ Pause</button>
        ) : (
          <button onClick={play}>▶ Play</button>
        )}

        <button onClick={next}>⏭ Next</button>
      </div>

      {/* TRACK LIST */}
      <div>
        {tracks.length === 0 && <p>Loading...</p>}

        {tracks.map((t, i) => (
          <div
            key={i}
            onClick={() => playIndex(i)}
            style={{
              padding: 10,
              margin: 5,
              cursor: "pointer",
              background: "#fff",
              borderRadius: 8,
            }}
          >
            🪔 {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;