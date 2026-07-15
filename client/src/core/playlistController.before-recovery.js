import audioEngine from "../audioEngine.js";

class PlaylistController {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;

    this.onChange = null;

    // restore session safely
    try {
      const saved = localStorage.getItem("playlist");
      const savedIndex = localStorage.getItem("currentIndex");

      if (saved) {
        this.queue = JSON.parse(saved);
        this.currentIndex = parseInt(savedIndex || 0);
      }
    } catch (e) {
      console.log("restore failed", e);
    }
  }

  // sync UI state
  _emit() {
    if (this.onChange) {
      this.onChange({
        queue: this.queue,
        currentIndex: this.currentIndex,
        currentTrack: this.queue[this.currentIndex] || null,
      });
    }

    localStorage.setItem("playlist", JSON.stringify(this.queue));
    localStorage.setItem("currentIndex", this.currentIndex);
  }

  // LOAD PLAYLIST
  load(queue = [], startIndex = 0) {
    this.queue = queue;
    this.currentIndex = startIndex;

    audioEngine.setPlaylist(queue);
    audioEngine.playIndex(startIndex);

    this._emit();
  }

  // PLAY CURRENT
  play(index = null) {
    if (index !== null) {
      this.currentIndex = index;
    }

    audioEngine.playIndex(this.currentIndex);
    this._emit();
  }

  pause() {
    audioEngine.pause();
  }

  next() {
    this.currentIndex++;
    audioEngine.playIndex(this.currentIndex);
    this._emit();
  }

  previous() {
    this.currentIndex--;
    audioEngine.playIndex(this.currentIndex);
    this._emit();
  }

  clear() {
    this.queue = [];
    this.currentIndex = 0;

    localStorage.removeItem("playlist");
    localStorage.removeItem("currentIndex");

    audioEngine.clear();
    this._emit();
  }
}

export default new PlaylistController();