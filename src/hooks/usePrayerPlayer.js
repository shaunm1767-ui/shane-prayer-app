import { useRef, useState } from "react";

export const usePrayerPlayer = () => {
  const audioRef = useRef(new Audio());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // 🔊 PLAY TRACK
  const play = async (track) => {
    try {
      if (!track?.url) {
        console.warn("⚠️ No URL found for track");
        return;
      }

      console.log("🎵 Attempting to play:", track.url);

      // 🔁 Reset audio completely before new play
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // 🔥 CRITICAL: set src AFTER reset
      audioRef.current.src = track.url;

      // 🔊 Force load
      await audioRef.current.load();

      // ▶ PLAY
      await audioRef.current.play();

      setCurrentTrack(track);
      setIsPlaying(true);

      console.log("✅ PLAYING:", track.title);

    } catch (err) {
      console.error("❌ AUDIO PLAY ERROR:", err);
    }
  };

  // ⏸ PAUSE
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return {
    play,
    pause,
    isPlaying,
    currentTrack,
  };
};