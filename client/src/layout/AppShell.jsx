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
    <div style={styles.shell}>
      <div style={styles.content}>
        {renderScreen()}
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
    color: "white",
  },

  content: {
    flex: 1,
    overflowY: "auto",
  },
};