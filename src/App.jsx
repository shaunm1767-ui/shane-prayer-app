import React, { useEffect, useState } from "react";
import { loadPlaylist } from "./utils/loadPlaylist";

function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await loadPlaylist();
      setTracks(data);
    };

    fetchTracks();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>?? Shane Prayer App</h1>

      {tracks.length === 0 ? (
        <p>Loading audio...</p>
      ) : (
        <div>
          <h3>Loaded Tracks:</h3>
          {tracks.map((track, index) => (
            <p key={index}>?? {track.title}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
