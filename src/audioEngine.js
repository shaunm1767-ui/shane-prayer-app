class AudioEngine {
  constructor() {
    this.audio = new Audio();

    this.currentTrack = null;
    this.isPlaying = false;

    this.queue = [];
    this.currentIndex = -1;

    this.lock = false;
    this.lastPlayTime = 0;

    this.progressInterval = null;

    // bind events once
    this.audio.onended = () => this.next();
  }

  // =========================
  // ▶ PLAY
  // =========================
  async play(src = null) {
    try {
      const now = Date.now();

      if (now - this.lastPlayTime < 250) return;
      if (this.lock) return;

      this.lock = true;
      this.lastPlayTime = now;

      if (!src && this.queue.length > 0) {
        src = this.queue[this.currentIndex];
      }

      if (!src) {
        this.lock = false;
        return;
      }

      console.log("ENGINE PLAY:", src);

      if (this.currentTrack !== src) {
        this.audio.pause();
        this.audio.src = src;
        this.currentTrack = src;
      }

      await this.audio.play();

      this.isPlaying = true;
      this.lock = false;

      this.startProgressTracking();

    } catch (err) {
      console.log("ENGINE ERROR:", err);
      this.lock = false;
    }
  }

  // =========================
  // ⏸ PAUSE
  // =========================
  pause() {
    this.audio.pause();
    this.isPlaying = false;

    this.stopProgressTracking();
    this.saveProgress();
  }

  // =========================
  // ⏭ NEXT
  // =========================
  next() {
    if (!this.queue.length) return;

    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.play(this.queue[this.currentIndex]);
    }
  }

  // =========================
  // ⏮ PREVIOUS
  // =========================
  previous() {
    if (!this.queue.length) return;

    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.play(this.queue[this.currentIndex]);
    }
  }

  // =========================
  // 🎧 LOAD PLAYLIST
  // =========================
  loadQueue(queue, index = 0) {
    this.queue = queue || [];
    this.currentIndex = index;

    localStorage.setItem("playlist", JSON.stringify(this.queue));
    localStorage.setItem("currentIndex", this.currentIndex);
  }

  // =========================
  // 🔄 RESUME SESSION (SAFE)
  // =========================
  resumeLast() {
    const lastTrack = localStorage.getItem("lastTrack");
    const lastTime = localStorage.getItem("lastTime");

    const savedQueue = localStorage.getItem("playlist");
    const savedIndex = localStorage.getItem("currentIndex");

    if (savedQueue) {
      this.queue = JSON.parse(savedQueue);
      this.currentIndex = parseInt(savedIndex || 0);
    }

    if (!lastTrack) return;

    console.log("RESUME READY:", lastTrack);

    this.currentTrack = lastTrack;
    this.audio.src = lastTrack;

    this.audio.onloadedmetadata = () => {
      this.audio.currentTime = parseFloat(lastTime || 0);
      this.isPlaying = false;

      console.log("READY FOR USER PLAY");
    };
  }

  // =========================
  // 💾 SAVE PROGRESS
  // =========================
  saveProgress() {
    if (!this.currentTrack) return;

    localStorage.setItem("lastTrack", this.currentTrack);
    localStorage.setItem("lastTime", this.audio.currentTime);
    localStorage.setItem("playlist", JSON.stringify(this.queue));
    localStorage.setItem("currentIndex", this.currentIndex);
  }

  // =========================
  // 📊 PROGRESS TRACKING
  // =========================
  startProgressTracking() {
    this.stopProgressTracking();

    this.progressInterval = setInterval(() => {
      if (!this.audio || this.audio.paused) return;

      this.saveProgress();

      console.log(
        "PROGRESS:",
        this.currentTrack,
        this.audio.currentTime.toFixed(1)
      );
    }, 2000);
  }

  stopProgressTracking() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  // =========================
  // 🔍 HELPERS
  // =========================
  getCurrentTrack() {
    return this.queue[this.currentIndex] || this.currentTrack;
  }
}

const audioEngine = new AudioEngine();
export default audioEngine;