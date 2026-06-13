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
      {items.map((item) => {
        const active = current === item.id;

        return (
          <div
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              ...styles.item,
              color: active ? "#1db954" : "#aaa",
              transform: active ? "scale(1.08)" : "scale(1)",
            }}
          >
            <div style={styles.dot(active)} />
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  nav: {
    height: "70px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "#121218",
    borderTop: "1px solid #222",
  },

  item: {
    fontSize: "12px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  dot: (active) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    margin: "0 auto 4px",
    background: active ? "#1db954" : "transparent",
  }),
};