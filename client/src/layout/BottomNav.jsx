export default function BottomNav({ current, setTab }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "listen", label: "Listen" },
    { id: "pray", label: "Pray" },
    { id: "support", label: "Support" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div style={styles.nav}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigator.vibrate?.(10);
            setTab(item.id);
          }}
          style={{
            ...styles.item,
            opacity: current === item.id ? 1 : 0.5,
            transform: current === item.id ? "scale(1.05)" : "scale(1)",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

const styles = {
  nav: {
    height: 60,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "#111",
    borderTop: "1px solid #222",
  },

  item: {
    fontSize: 12,
    color: "#fff",
    cursor: "pointer",
    transition: "all 120ms ease",
  },
};