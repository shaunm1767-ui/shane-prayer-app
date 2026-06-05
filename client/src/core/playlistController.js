import audioEngine from "../audioEngine.js";

class PlaylistController {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;

    audioEngine.onIndexChange = (index) => {
      this.currentIndex = index;
    };

    // Safely restore state on load
    const savedQueue = localStorage.getItem("playlist");
    const savedIndex = localStorage.getItem("currentIndex");
    if (savedQueue) {
      this.queue = JSON.parse(savedQueue);
      this.currentIndex = parseInt(savedIndex || 0);
    }
    audioEngine.resumeLast();
  }

  load(queue = [], startIndex = 0) {
    this.queue = queue;
    this.currentIndex = startIndex;

    audioEngine.loadQueue(queue, startIndex);
  }

  play(index = null) {
    if (index !== null) {
      this.currentIndex = index;
      audioEngine.currentIndex = index;
    }

    const track = this.queue[this.currentIndex];
    if (!track) return;

    audioEngine.play(track);
  }

  pause() {
    audioEngine.pause();
  }

  next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      audioEngine.currentIndex = this.currentIndex;
      audioEngine.play(this.queue[this.currentIndex]);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      audioEngine.currentIndex = this.currentIndex;
      audioEngine.play(this.queue[this.currentIndex]);
    }
  }

  clear() {
    this.queue = [];
    this.currentIndex = 0;
    audioEngine.clear();
  }

  getCurrent() {
    return this.queue[this.currentIndex] || null;
  }
}

export default new PlaylistController();