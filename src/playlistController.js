import audioEngine from "../audioEngine.js";

/**
 * SINGLE SOURCE OF TRUTH
 * Controls:
 * - playlist
 * - current index
 * - playback commands
 */

class PlaylistController {
  constructor() {
    this.queue = [];
    this.currentIndex = -1;

    this.subscribers = [];
  }

  // =========================
  // 📥 SET PLAYLIST
  // =========================
  setQueue(tracks = []) {
    this.queue = tracks;
    this.currentIndex = tracks.length ? 0 : -1;

    this.syncToEngine();
    this.notify();
  }

  // =========================
  // ▶ PLAY TRACK
  // =========================
  play(index = this.currentIndex) {
    if (!this.queue.length) return;

    if (index < 0 || index >= this.queue.length) return;

    this.currentIndex = index;

    const track = this.queue[this.currentIndex];

    audioEngine.play(track);

    this.notify();
  }

  // =========================
  // ⏸ PAUSE
  // =========================
  pause() {
    audioEngine.pause();
    this.notify();
  }

  // =========================
  // ⏭ NEXT
  // =========================
  next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.play(this.currentIndex);
    }
  }

  // =========================
  // ⏮ PREVIOUS
  // =========================
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.play(this.currentIndex);
    }
  }

  // =========================
  // 🔄 SYNC ENGINE STATE
  // =========================
  syncToEngine() {
    audioEngine.queue = this.queue;
    audioEngine.currentIndex = this.currentIndex;
  }

  // =========================
  // 📡 SUBSCRIBE UI
  // =========================
  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify() {
    this.subscribers.forEach(fn =>
      fn({
        queue: this.queue,
        currentIndex: this.currentIndex,
        currentTrack: this.queue[this.currentIndex] || null,
        isPlaying: audioEngine.isPlaying,
      })
    );
  }
}

const playlistController = new PlaylistController();
export default playlistController;