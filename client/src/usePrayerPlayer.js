import { useEffect, useRef, useState } from "react";

export default function usePrayerPlayer(tracks = []) {
  const audioRef = useRef(new Audio());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = tracks?.[currentIndex] || null;

  // Load track safely
  useEffect(() => {
    if (!currentTrack?.url) return;

    const audio = audioRef.current;

    audio.pause();
    audio.src = currentTrack.url;
    audio.load();

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("❌ Play failed:", err);
      });
    }
  }, [currentIndex, tracks]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio.src) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error("❌ Play error:", e);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const next = () => {
    if (!tracks.length) return;
    setCurrentIndex((i) => (i + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prev = () => {
    if (!tracks.length) return;
    setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return {
    currentTrack,
    currentIndex,
    isPlaying,
    play,
    pause,
    next,
    prev,
    selectTrack,
  };
}