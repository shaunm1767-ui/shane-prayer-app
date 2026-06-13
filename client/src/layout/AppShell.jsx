import { useState } from "react";
import BottomNav from "./BottomNav";
import HomeScreen from "../screens/HomeScreen";
import ListenScreen from "../screens/ListenScreen";
import PrayScreen from "../screens/PrayScreen";
import SupportScreen from "../screens/SupportScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NowPlayingBar from "../components/NowPlayingBar";

export default function AppShell() {
  const [tab, setTab] = useState("home");

  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <HomeScreen />;
      case "listen":
        return <ListenScreen />;
      case "pray":
        return <PrayScreen />;
      case "support":
        return <SupportScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div style={styles.app}>
      {/* SCREEN AREA */}
      <div style={styles.screen}>{renderScreen()}</div>

      {/* MINI PLAYER (sticky like Spotify) */}
      <div style={styles.player}>
        <NowPlayingBar />
      </div>

      {/* BOTTOM NAV */}
      <div style={styles.nav}>
        <BottomNav current={tab} setTab={setTab} />
      </div>
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f0f",
    color: "#fff",
  },
  screen: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 120, // space for player + nav
  },
  player: {
    position: "fixed",
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 60,
    background: "#111",
    borderTop: "1px solid #222",
  },
};