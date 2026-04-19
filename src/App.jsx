// src/App.jsx

import { useEffect, useRef, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import loadPlaylist from "./utils/loadPlaylist";

export default function App() {
  const audioRef = useRef(new Audio());
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [folder, setFolder] = useState("aarti");

  // AUTH
  useEffect(() => {
    console.log("🔐 Firebase auth init...");

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      console.log("🔐 Auth state:", u);
    });

    return () => unsub();
  }, []);

  // LOAD MUSIC
  useEffect(() => {
    async function load() {
      console.log("📦 Loading mode:", folder);
      const data = await loadPlaylist(folder);
      setTracks(data);
      setCurrentIndex(0);
    }

    load();
  }, [folder]);

  // PLAY TRACK
  const play = (index) => {
    if (!tracks.length) return;

    const track = tracks[index];
    if (!track) return;

    console.log("🎧 PLAYING:", track.name);

    audioRef.current.pause();
    audioRef.current.src = track.url;
    audioRef.current.load();

    audioRef.current
      .play()
      .catch((err) => console.error("❌ PLAY ERROR:", err));

    setCurrentIndex(index);
  };

  const next = () => {
    const i = (currentIndex + 1) % tracks.length;
    play(i);
  };

  const prev = () => {
    const i = (currentIndex - 1 + tracks.length) % tracks.length;
    play(i);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>🕉 Prayer App</h2>

      {/* USER */}
      <div>
        {user ? (
          <>
            👤 {user.email}
            <button onClick={() => signOut(auth)}>Logout</button>
          </>
        ) : (
          <p>Not logged in</p>
        )}
      </div>

      {/* MODE SWITCH */}
      <div style={{ marginTop: 10 }}>
        {["aarti", "bhajan", "chalisa", "discourse"].map((m) => (
          <button key={m} onClick={() => setFolder(m)}>
            {m}
          </button>
        ))}
      </div>

      {/* PLAYER */}
      <h3 style={{ marginTop: 20 }}>🎧 Now Playing</h3>
      <p>{tracks[currentIndex]?.name || "No track loaded"}</p>

      <button onClick={prev}>⏮ Prev</button>
      <button onClick={() => play(currentIndex)}>▶ Play</button>
      <button onClick={next}>⏭ Next</button>

      {/* PLAYLIST */}
      <h4 style={{ marginTop: 20 }}>🪔 Playlist</h4>
      {tracks.map((t, i) => (
        <div key={i}>
          <button onClick={() => play(i)}>{t.name}</button>
        </div>
      ))}
    </div>
  );
}