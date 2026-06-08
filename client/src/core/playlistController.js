import audioEngine from "../audioEngine.js";

class PlaylistController {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;

    // sync engine → controller
    audioEngine.onIndexChange = (index) => {
      this.currentIndex = index;
      this.saveState();
    };

    // restore saved session safely
    const savedQueue = localStorage.getItem("playlist");
    const savedIndex = localStorage.getItem("currentIndex");

    if (savedQueue) {
      try {
        this.queue = JSON.parse(savedQueue);
        this.currentIndex = parseInt(savedIndex || "0", 10);

        audioEngine.setPlaylist(this.queue);
      } catch (e) {
        console.log("Failed to restore playlist:", e);
      }
    }
  }

  // =========================
  // SAVE STATE
  // =========================
  saveState() {
    try {
      localStorage.setItem("playlist", JSON.stringify(this.queue));
      localStorage.setItem("currentIndex", this.currentIndex.toString());
    } catch (e) {
      console.log("Save state error:", e);
    }
  }

  // =========================
  // LOAD PLAYLIST
  // =========================
  load(queue = [], startIndex = 0) {
    this.queue = queue;
    this.currentIndex = startIndex;

    audioEngine.setPlaylist(queue);
    audioEngine.playIndex(startIndex);

    this.saveState();
  }

  // =========================
  // PLAY SPECIFIC INDEX
  // =========================
  play(index = null) {
    if (!this.queue.length) return;

    if (index !== null) {
      this.currentIndex = index;
    }

    audioEngine.playIndex(this.currentIndex);

    this.saveState();
  }

  // =========================
  // PAUSE
  // =========================
  pause() {
    audioEngine.pause();
  }

  // =========================
  // NEXT TRACK
  // =========================
  next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      audioEngine.playIndex(this.currentIndex);
      this.saveState();
    }
  }

  // =========================
  // PREVIOUS TRACK
  // =========================
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      audioEngine.playIndex(this.currentIndex);
      this.saveState();
    }
  }

  // =========================
  // CLEAR SESSION
  // =========================
  clear() {
    this.queue = [];
    this.currentIndex = 0;

    localStorage.removeItem("playlist");
    localStorage.removeItem("currentIndex");

    audioEngine.clear();
  }

  // =========================
  // GET CURRENT TRACK
  // =========================
  getCurrent() {
    return this.queue[this.currentIndex] || null;
  }
}

export default new PlaylistController();