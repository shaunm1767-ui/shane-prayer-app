import audioEngine from "../audioEngine.js";

class PlaylistController {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;
    this.onChange = null;

    try {
      const saved = localStorage.getItem("playlist");
      const savedIndex = localStorage.getItem("currentIndex");

      if (saved) {
        this.queue = JSON.parse(saved);
        this.currentIndex = Number.parseInt(savedIndex || "0", 10);
      }
    } catch (error) {
      console.error("[PLAYLIST] Restore failed:", error);
    }

    audioEngine.onStateChange = (state) => {
      this.currentIndex = state.currentIndex;
      this._emit(state);
    };
  }

  _emit(engineState = null) {
    const state = engineState || {
      queue: this.queue,
      currentIndex: this.currentIndex,
      currentTrack: this.queue[this.currentIndex] || null,
      isPlaying: audioEngine.isPlaying,
    };

    if (this.onChange) {
      this.onChange(state);
    }

    localStorage.setItem("playlist", JSON.stringify(this.queue));
    localStorage.setItem("currentIndex", String(this.currentIndex));
  }

  load(queue = [], startIndex = 0) {
    this.queue = Array.isArray(queue) ? queue : [];
    this.currentIndex = startIndex;

    audioEngine.setPlaylist(this.queue);
    audioEngine.playIndex(startIndex);
  }

  play(index = null) {
    if (index !== null) {
      this.currentIndex = index;
      audioEngine.playIndex(index);
      return;
    }

    audioEngine.resume();
  }

  pause() {
    audioEngine.pause();
  }

  toggle() {
    audioEngine.toggle();
  }

  next() {
    audioEngine.next();
  }

  previous() {
    audioEngine.previous();
  }

  clear() {
    this.queue = [];
    this.currentIndex = 0;

    localStorage.removeItem("playlist");
    localStorage.removeItem("currentIndex");

    audioEngine.clear();
  }
}

export default new PlaylistController();
