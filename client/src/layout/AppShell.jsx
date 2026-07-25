import { useState } from "react";

import BottomNav from "./BottomNav";
import NowPlayingBar from "../components/NowPlayingBar";

import HomeScreen from "../screens/HomeScreen";
import ListenScreen from "../screens/ListenScreen";
import PrayScreen from "../screens/PrayScreen";
import SupportScreen from "../screens/SupportScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default function AppShell() {
  const [tab, setTab] = useState("pray");

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

      <NowPlayingBar />

      <BottomNav
        current={tab}
        setTab={setTab}
      />
    </div>
  );
}

const styles = {
  shell: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#121212",
    color: "#ffffff",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 140, // room for player + nav
    background: "#121212",
  },
};
