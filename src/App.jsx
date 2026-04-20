import { useEffect, useState } from "react";
import { auth, storage } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState("aarti");

  // 🔐 AUTH
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  // 🎧 LOAD TRACKS
  useEffect(() => {
    if (!user) return;

    async function loadTracks() {
      const res = await fetch("/audio-index.json");
      const data = await res.json();

      const files = data[mode] || [];

      const trackObjects = await Promise.all(
        files.map(async (file) => {
          const url = await getDownloadURL(ref(storage, `${mode}/${file}`));
          return {
            name: file,
            url: url
          };
        })
      );

      setTracks(trackObjects);
      setCurrent(0);
    }

    loadTracks();
  }, [mode, user]);

  // 🔐 LOGIN SCREEN
  if (!user) {
    return (
      <div style={{ padding: 30 }}>
        <h2>🔐 Login / Signup</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button onClick={() =>
          createUserWithEmailAndPassword(auth, email, password)
        }>Sign Up</button>

        <button onClick={() =>
          signInWithEmailAndPassword(auth, email, password)
        }>Login</button>
      </div>
    );
  }

  const btnStyle = {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    borderRadius: "8px",
    background: "#f1c45b",
    fontWeight: "bold",
    cursor: "pointer"
  };

  return (
    <div style={{
      padding: 20,
      minHeight: "100vh",
      background: "linear-gradient(180deg,#dbeefe,#c7e2f5)",
      fontFamily: "Arial"
    }}>

      <h2>🕉 Prayer App</h2>

      <p>👤 {user.email}</p>
      <button style={btnStyle} onClick={() => signOut(auth)}>Logout</button>

      <hr />

      {/* MODE */}
      <div>
        <button style={btnStyle} onClick={() => setMode("aarti")}>Aarti</button>
        <button style={btnStyle} onClick={() => setMode("bhajan")}>Bhajan</button>
        <button style={btnStyle} onClick={() => setMode("chalisa")}>Chalisa</button>
        <button style={btnStyle} onClick={() => setMode("discourse")}>Discourse</button>
      </div>

      {/* PLAYER */}
      <div style={{ marginTop: 20 }}>
        <h3>🎧 Now Playing</h3>

        {tracks.length > 0 ? (
          <>
            <audio
              controls
              src={tracks[current]?.url}
              autoPlay
              onEnded={() =>
                setCurrent((prev) => (prev + 1) % tracks.length)
              }
            />

            <p style={{ fontWeight: "bold" }}>
              Now Playing: {tracks[current]?.name.replace(".mp3", "").replaceAll("_", " ")}
            </p>

            <p>Track {current + 1} of {tracks.length}</p>

            {/* PLAYLIST */}
            <div style={{ marginTop: 20 }}>
              <h4>🪔 Playlist</h4>

              {tracks.map((t, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    padding: 10,
                    marginBottom: 5,
                    borderRadius: 6,
                    cursor: "pointer",
                    background: i === current ? "#ffd166" : "#ffffff"
                  }}
                >
                  🎵 {t.name.replace(".mp3", "").replaceAll("_", " ")}
                </div>
              ))}
            </div>

            {/* CONTROLS */}
            <div style={{ marginTop: 15 }}>
              <button style={btnStyle} onClick={() =>
                setCurrent((prev) => (prev - 1 + tracks.length) % tracks.length)
              }>⏮ Prev</button>

              <button style={btnStyle} onClick={() =>
                setCurrent((prev) => (prev + 1) % tracks.length)
              }>⏭ Next</button>
            </div>

          </>
        ) : (
          <p>No track loaded</p>
        )}
      </div>
    </div>
  );
}