import { useRef, useState, useCallback } from "react";

export function usePrayerPlayer() {
  const audioRef = useRef(null);

  const [tracks, setTracksState] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // -----------------------------
  // LOAD TRACKS
  // -----------------------------
  const setTracks = useCallback((list) => {
    if (!Array.isArray(list)) return;

    setTracksState(list);
    setCurrentIndex(0);

    // cleanup old audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }, []);

  // -----------------------------
  // CORE PLAY ENGINE
  // -----------------------------
  const playTrack = useCallback(
    async (index) => {
      if (!tracks.length) return;

      // clamp + loop logic
      let safeIndex = index;

      if (safeIndex < 0) safeIndex = tracks.length - 1;
      if (safeIndex >= tracks.length) safeIndex = 0;

      const track = tracks[safeIndex];

      if (!track?.url) {
        console.warn("⚠️ Missing URL at index:", safeIndex);
        return;
      }

      try {
        setCurrentIndex(safeIndex);

        // -----------------------------
        // HARD RESET AUDIO ENGINE
        // -----------------------------
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current.load();
          audioRef.current = null;
        }

        const audio = new Audio();
        audio.src = track.url;
        audio.preload = "auto";

        audioRef.current = audio;

        // important for Firebase streaming stability
        audio.load();

        await audio.play();

        setIsPlaying(true);

        // auto-next (clean chain)
        audio.onended = () => {
          playTrack(safeIndex + 1);
        };

        audio.onerror = (e) => {
          console.error("❌ Audio error:", track.title, e);
          setIsPlaying(false);
        };
      } catch (err) {
        console.error("❌ Playback failed:", err);
        setIsPlaying(false);
      }
    },
    [tracks]
  );

  // -----------------------------
  // PUBLIC API
  // -----------------------------
  const play = useCallback(
    (track) => {
      if (!tracks.length) return;

      const index = tracks.findIndex((t) => t.url === track.url);
      if (index !== -1) {
        playTrack(index);
      }
    },
    [tracks, playTrack]
  );

  const next = useCallback(() => {
    playTrack(currentIndex + 1);
  }, [currentIndex, playTrack]);

  const prev = useCallback(() => {
    playTrack(currentIndex - 1);
  }, [currentIndex, playTrack]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // -----------------------------
  // CURRENT TRACK
  // -----------------------------
  const currentTrack = tracks[currentIndex] || null;

  return {
    tracks,
    setTracks,
    play,
    next,
    prev,
    pause,
    isPlaying,
    currentTrack,
    currentIndex,
  };
}