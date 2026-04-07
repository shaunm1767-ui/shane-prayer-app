import { useState } from "react";
import { playlist } from "./playlist";

export default function App() {
  const [index, setIndex] = useState(0);

  const current = playlist[index];

  const next = () => {
    setIndex((i) => (i + 1) % playlist.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Shane Prayer App</h1>

      <h2>{current.title}</h2>

      <audio
        key={current.url}
        controls
        autoPlay
        onEnded={next}
        style={{ width: "100%" }}
      >
        <source src={current.url} type="audio/mpeg" />
      </audio>

      <br /><br />

      <button onClick={prev}>Prev</button>
      <button onClick={next} style={{ marginLeft: 10 }}>
        Next
      </button>
    </div>
  );
}