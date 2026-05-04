import { useState } from "react";
import BottomNav from "./BottomNav";
import HomeScreen from "../screens/HomeScreen";

export default function AppShell() {
  const [tab, setTab] = useState("home");

  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <HomeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflow: "auto", background: "#f5f5f5" }}>
        {renderScreen()}
      </div>

      {/* NAV */}
      <BottomNav current={tab} setTab={setTab} />
    </div>
  );
}