import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("aarti");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // 🔐 AUTH LISTENER
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("🔐 Auth state:", u);
      setUser(u);
    });

    return () => unsub();
  }, []);

  // 🎧 LOAD FIREBASE TRACKS (FULL LIBRARY MODE)
  useEffect(() => {
    if (!user) return;

    async function loadTracks() {
      try {
        setLoading(true);
        console.log("📦 Loading folder:", mode);

        const folderRef = ref(storage, `${mode}/`);
        const res = await listAll(folderRef);

        const trackList = await Promise.all(
          res.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              name: item.name,
              url
            };
          })
        );

        console.log("🎧 TRACKS LOADED:", trackList);

        setTracks(trackList);

        // auto set first track
        if (trackList.length > 0) {
          setCurrentTrack(trackList[0]);
        }

      } catch (err) {
        console.error("❌ Error loading tracks:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTracks();
  }, [mode, user]);

  // 🔁 PLAY NEXT
  const playNext = () => {
    const index = tracks.findIndex(t => t.url === currentTrack?.url);
    const next = tracks[index + 1] || tracks[0];
    setCurrentTrack(next);
  };

  // 🔁 PLAY PREV
  const playPrev = () => {
    const index = tracks.findIndex(t => t.url === currentTrack?.url);
    const prev = tracks[index - 1] || tracks[tracks.length - 1];
    setCurrentTrack(prev);
  };

  // 🔐 LOGIN STATE
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🔐 Please login to continue</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>

      <h2>🕉 Prayer App</h2>
      <p>👤 {user.email}</p>

      {/* MODE SWITCH */}
      <div style={{ marginBottom: 10 }}>
        {["aarti", "bhajan", "chalisa", "discourse"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              marginRight: 8,
              padding: 8,
              background: mode === m ? "#4caf50" : "#ddd"
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && <p>⏳ Loading tracks...</p>}

      {/* CURRENT TRACK */}
      <div>
        <h3>🎧 Now Playing</h3>
        {currentTrack ? (
          <>
            <p>{currentTrack.name}</p>
            <audio
              controls
              autoPlay
              src={currentTrack.url}
              onEnded={playNext}
              style={{ width: "100%" }}
            />
          </>
        ) : (
          <p>No track loaded</p>
        )}
      </div>

      {/* PLAYER CONTROLS */}
      <div style={{ marginTop: 10 }}>
        <button onClick={playPrev}>⏮ Prev</button>
        <button onClick={playNext}>⏭ Next</button>
      </div>

      {/* PLAYLIST */}
      <div style={{ marginTop: 20 }}>
        <h3>🪔 Playlist</h3>

        {tracks.length === 0 && !loading && (
          <p>⚠️ No tracks found in Firebase folder: {mode}</p>
        )}

        {tracks.map((t, i) => (
          <div
            key={i}
            onClick={() => setCurrentTrack(t)}
            style={{
              padding: 8,
              cursor: "pointer",
              background: currentTrack?.url === t.url ? "#e0f7fa" : "transparent"
            }}
          >
            🎵 {t.name}
          </div>
        ))}
      </div>

    </div>
  );
}