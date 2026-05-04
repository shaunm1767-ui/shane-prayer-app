export default function BottomNav({ current, setTab }) {
  const Item = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      style={{
        flex: 1,
        padding: 14,
        border: "none",
        background: "white",
        fontSize: 13,
        fontWeight: current === id ? "bold" : "normal",
        color: current === id ? "#1a7f37" : "#666",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid #ddd",
        background: "#fff",
      }}
    >
      <Item id="home" label="Home" />
      <Item id="listen" label="Listen" />
      <Item id="pray" label="Pray" />
      <Item id="support" label="Support" />
      <Item id="settings" label="Settings" />
    </div>
  );
}