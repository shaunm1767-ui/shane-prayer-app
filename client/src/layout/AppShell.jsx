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

  // 🎧 global playback state (simple v8 foundation)
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const renderScreen = () => {
    if (tab === "home")
      return (
        <HomeScreen
          onPlay={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
        />
      );

    if (tab === "listen")
      return (
        <ListenScreen
          onPlay={playTrack}
          currentTrack={currentTrack}
        />
      );

    if (tab === "pray") return <PrayScreen />;
    if (tab === "support") return <SupportScreen />;
    if (tab === "settings") return <SettingsScreen />;

    return <HomeScreen />;
  };

  return (
    <div style={styles.shell}>
      <div style={styles.content}>
        <div style={styles.screen}>{renderScreen()}</div>
      </div>

      <div style={styles.player}>
        <NowPlayingBar
          track={currentTrack}
          isPlaying={isPlaying}
          onPause={pauseTrack}
        />
      </div>

      <div style={styles.nav}>
        <BottomNav current={tab} setTab={setTab} />
      </div>
    </div>
  );
}

const styles = {
  shell: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0b0b0f",
    color: "#fff",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    overflow: "hidden",
  },

  screen: {
    height: "100%",
    overflowY: "auto",
    padding: 16,
    paddingBottom: 180,
  },

  player: {
    position: "fixed",
    bottom: 70,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "0 10px",
  },

  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 110,
  },
};