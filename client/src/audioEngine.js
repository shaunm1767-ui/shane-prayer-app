class AudioEngine {
  constructor() {
    this.audio = new Audio();

    this.queue = [];
    this.currentIndex = -1;

    this.currentTrack = null;
    this.isPlaying = false;

    this.lock = false;

    this.onIndexChange = null;

    this.audio.onended = () => {
      console.log("TRACK ENDED");
      this.next();
    };
  }

  init() {
    console.log("AudioEngine initialized (user unlocked audio)");
  }

  loadQueue(queue, index = 0) {
    this.queue = queue || [];
    this.currentIndex = index;
  }

  play(src = null) {
    if (this.lock) return;

    this.lock = true;

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
      this.audio.load();
      this.currentTrack = src;
    }

    this.audio.play()
      .then(() => {
        this.isPlaying = true;
        this.lock = false;
      })
      .catch((err) => {
        console.log("ENGINE ERROR:", err);
        this.lock = false;
      });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  next() {
    if (!this.queue.length) return;

    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;

      const nextTrack = this.queue[this.currentIndex];

      if (this.onIndexChange) {
        this.onIndexChange(this.currentIndex);
      }

      setTimeout(() => {
        this.play(nextTrack);
      }, 150);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;

      const prevTrack = this.queue[this.currentIndex];

      if (this.onIndexChange) {
        this.onIndexChange(this.currentIndex);
      }

      setTimeout(() => {
        this.play(prevTrack);
      }, 150);
    }
  }

  clear() {
    this.pause();
    this.queue = [];
    this.currentIndex = -1;
    this.currentTrack = null;
  }
}

const audioEngine = new AudioEngine();
export default audioEngine;