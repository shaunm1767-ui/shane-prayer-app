export default function BottomNav({ current, setTab }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "listen", label: "Listen" },
    { id: "pray", label: "Pray" },
    { id: "support", label: "Support" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0",
      background: "#181818",
      borderTop: "1px solid #333"
    }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          style={{
            background: "none",
            border: "none",
            color: current === item.id ? "#1db954" : "#aaa",
            fontSize: 12
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}