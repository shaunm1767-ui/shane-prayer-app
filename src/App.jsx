import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import loadPlaylist from "./utils/loadPlaylist";

export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("aarti");
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);

  // 🔐 AUTH
  useEffect(() => {
    console.log("🔐 Firebase auth init...");
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("🔐 Auth state:", u);
      setUser(u);
    });
    return () => unsub();
  }, []);

  // 📦 LOAD PLAYLIST
  useEffect(() => {
    const fetchTracks = async () => {
      console.log("📦 Loading mode:", mode);
      const data = await loadPlaylist(mode);
      console.log("🎧 TRACKS LOADED:", data);
      setTracks(data);
      setCurrentIndex(0);
    };
    fetchTracks();
  }, [mode]);

  // 🎧 PLAY TRACK (LOCKED)
  const playTrack = (index) => {
    if (!tracks[index] || !audioRef.current) return;

    const track = tracks[index];

    try {
      // STOP previous
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // SET new source
      audioRef.current.src = track.url;

      // PLAY safely
      audioRef.current
        .play()
        .then(() => {
          console.log("🎧 PLAYING:", track.name);
          setCurrentIndex(index);
        })
        .catch((err) => {
          console.error("❌ PLAY ERROR:", err);
        });
    } catch (err) {
      console.error("❌ CRITICAL PLAY ERROR:", err);
    }
  };

  const playNext = () => {
    if (tracks.length === 0) return;
    const next = (currentIndex + 1) % tracks.length;
    playTrack(next);
  };

  const playPrev = () => {
    if (tracks.length === 0) return;
    const prev = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prev);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // ⏭ AUTO NEXT TRACK
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentIndex, tracks]);

  // 🔐 LOGIN BLOCK
  if (!user) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>🔐 Please login to continue</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, color: "white", background: "#121212", minHeight: "100vh" }}>
      <h1>🕉 Prayer App</h1>

      <div style={{ marginBottom: 20 }}>
        👤 {user.email}
        <button onClick={handleLogout} style={{ marginLeft: 10 }}>
          Logout
        </button>
      </div>

      {/* MODE SELECT */}
      <div style={{ marginBottom: 20 }}>
        {["aarti", "bhajan", "chalisa", "discourse"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              margin: 5,
              padding: "10px 15px",
              background: mode === m ? "#1db954" : "#333",
              color: "white",
              border: "none",
              borderRadius: 5,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* NOW PLAYING */}
      <div style={{ marginBottom: 20 }}>
        <h3>🎧 Now Playing</h3>
        {tracks[currentIndex]
          ? tracks[currentIndex].name
          : "No track loaded"}
      </div>

      {/* CONTROLS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={playPrev}>⏮ Prev</button>
        <button onClick={() => audioRef.current?.play()}>▶ Play</button>
        <button onClick={() => audioRef.current?.pause()}>⏸ Pause</button>
        <button onClick={playNext}>⏭ Next</button>
      </div>

      {/* PLAYLIST */}
      <div>
        <h3>🪔 Playlist</h3>
        {tracks.map((t, i) => (
          <div
            key={i}
            onClick={() => playTrack(i)}
            style={{
              padding: 10,
              cursor: "pointer",
              background: i === currentIndex ? "#1db954" : "#222",
              marginBottom: 5,
              borderRadius: 5,
            }}
          >
            {t.name}
          </div>
        ))}
      </div>

      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} />
    </div>
  );
}