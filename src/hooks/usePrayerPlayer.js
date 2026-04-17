// src/hooks/usePrayerPlayer.js

let playlist = [];
let currentIndex = 0;
let audio = new Audio();

export const usePrayerPlayer = () => {
  const load = (tracks) => {
    playlist = tracks || [];
    currentIndex = 0;
  };

  const play = (track) => {
    if (!playlist.length) return;

    if (track) {
      const index = playlist.findIndex(t => t.url === track.url);
      if (index !== -1) currentIndex = index;
    }

    const current = playlist[currentIndex];

    if (!current?.url) return;

    console.log("▶ Playing:", current.title);

    audio.src = current.url;
    audio.play().catch(err => {
      console.error("❌ AUDIO ERROR:", err);
    });
  };

  const pause = () => {
    audio.pause();
  };

  const next = () => {
    if (!playlist.length) return;

    currentIndex = (currentIndex + 1) % playlist.length;
    play();
  };

  const prev = () => {
    if (!playlist.length) return;

    currentIndex =
      (currentIndex - 1 + playlist.length) % playlist.length;
    play();
  };

  audio.onended = () => {
    console.log("⏭ Auto next");
    next();
  };

  return {
    load,
    play,
    pause,
    next,
    prev,
  };
};