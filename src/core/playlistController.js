import audioEngine from "../audioEngine.js";

class PlaylistController {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;
  }

  load(queue = [], startIndex = 0) {
    this.queue = queue;
    this.currentIndex = startIndex;

    audioEngine.loadQueue(queue, startIndex);
  }

  play(index = null) {
    if (index !== null) {
      this.currentIndex = index;
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
      audioEngine.play(this.queue[this.currentIndex]);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      audioEngine.play(this.queue[this.currentIndex]);
    }
  }

  clear() {
    this.queue = [];
    this.currentIndex = 0;
    audioEngine.pause();
  }

  getCurrent() {
    return this.queue[this.currentIndex] || null;
  }
}

export default new PlaylistController();