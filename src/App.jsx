import { useEffect, useState } from "react";
import { loadPlaylist } from "./utils/loadPlaylist";

export default function App() {
  const [playlist, setPlaylist] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function init() {
      const data = await loadPlaylist();
      setPlaylist(data);
    }

    init();
  }, []);

  if (playlist.length === 0) {
    return <h2>Loading Firebase audio...</h2>;
  }

  const current = playlist[index];

  return (
    <div style={{ padding: 20 }}>
      <h1>Shane Prayer App</h1>

      <h2>{current.title}</h2>

      <audio
  key={current.url}
  controls
  style={{ width: "100%" }}
>
  <source src={current.url} type="audio/mpeg" />
</audio>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() =>
            setIndex((i) => (i - 1 + playlist.length) % playlist.length)
          }
        >
          ⏮ Prev
        </button>

        <button
          style={{ marginLeft: 10 }}
          onClick={() => setIndex((i) => (i + 1) % playlist.length)}
        >
          Next ⏭
        </button>
      </div>
    </div>
  );
}