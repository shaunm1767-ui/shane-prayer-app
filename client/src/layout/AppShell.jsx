import { useState } from "react";
import BottomNav from "./BottomNav";
import HomeScreen from "../screens/HomeScreen";
import NowPlayingBar from "../components/NowPlayingBar";

export default function AppShell() {
  const [tab, setTab] = useState("home");

  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <HomeScreen />;
      case "listen":
        return <div style={styles.screen}>Listen Screen</div>;
      case "pray":
        return <div style={styles.screen}>Pray Screen</div>;
      case "support":
        return <div style={styles.screen}>Support Screen</div>;
      case "settings":
        return <div style={styles.screen}>Settings Screen</div>;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div style={styles.shell}>
      <div style={styles.content}>
        <div key={tab} style={styles.screen}>
          {renderScreen()}
        </div>
      </div>

      <BottomNav current={tab} setTab={setTab} />

      <NowPlayingBar />
    </div>
  );
}

const styles = {
  shell: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f0f",
  },

  content: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },

  screen: {
    height: "100%",
    overflowY: "auto",
    paddingBottom: 80,
    animation: "fadeIn 160ms ease-in-out",
  },
};