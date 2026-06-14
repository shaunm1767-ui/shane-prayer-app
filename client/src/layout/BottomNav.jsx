export default function BottomNav({ current, setTab }) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "listen", label: "Listen", icon: "🎧" },
    { id: "pray", label: "Pray", icon: "🙏" },
    { id: "support", label: "Support", icon: "🤝" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div style={styles.container}>
      {tabs.map((tab) => {
        const active = current === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            style={{
              ...styles.button,
              ...(active ? styles.activeButton : {}),
            }}
          >
            <div style={styles.icon}>{tab.icon}</div>

            <div
              style={{
                ...styles.label,
                color: active ? "#1DB954" : "#B3B3B3",
                fontWeight: active ? 600 : 400,
              }}
            >
              {tab.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,

    height: 68,

    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",

    background: "#181818",

    borderTop: "1px solid #282828",

    zIndex: 999,
  },

  button: {
    flex: 1,

    height: "100%",

    border: "none",

    background: "transparent",

    color: "#B3B3B3",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    cursor: "pointer",

    transition: "all 0.2s ease",
  },

  activeButton: {
    transform: "translateY(-2px)",
  },

  icon: {
    fontSize: 20,
    marginBottom: 4,
  },

  label: {
    fontSize: 11,
  },
};