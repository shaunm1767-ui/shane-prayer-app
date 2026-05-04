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
        return <div>Listen Screen</div>;
      case "pray":
        return <div>Pray Screen</div>;
      case "support":
        return <div>Support Screen</div>;
      case "settings":
        return <div>Settings Screen</div>;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      {/* MAIN APP WRAPPER */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: "auto", background: "#f5f5f5" }}>
          {renderScreen()}
        </div>

        {/* BOTTOM NAV */}
        <BottomNav current={tab} setTab={setTab} />

        {/* 🔥 STICKY AUDIO PLAYER */}
        <NowPlayingBar />
      </div>
    </>
  );
}