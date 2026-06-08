import { useState } from "react";
import BottomNav from "./BottomNav";
import HomeScreen from "../screens/HomeScreen";
import ListenScreen from "../screens/ListenScreen";
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
        return <div style={{ padding: 20 }}>Pray Screen (WIP)</div>;

      case "support":
        return <div style={{ padding: 20 }}>Support Screen (WIP)</div>;

      case "settings":
        return <div style={{ padding: 20 }}>Settings Screen (WIP)</div>;

      default:
        return <HomeScreen />;
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* SCREEN AREA */}
      <div style={{ flex: 1, overflow: "auto", background: "#f5f5f5" }}>
        {renderScreen()}
      </div>

      {/* NAV */}
      <BottomNav current={tab} setTab={setTab} />

      {/* PLAYER (GLOBAL) */}
      <NowPlayingBar />
    </div>
  );
}