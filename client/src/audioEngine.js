class AudioEngine {
  constructor() {
    this.audio = new Audio();

    this.queue = [];
    this.currentIndex = 0;

    this.isPlaying = false;
    this.currentTrack = null;

    this._isSwitching = false;
    this._endedLock = false;

    this.onIndexChange = null;
    this.onStateChange = null;

    this.audio.onplay = () => {
      this.isPlaying = true;
      this.emit();
    };

    this.audio.onpause = () => {
      this.isPlaying = false;
      this.emit();
    };

    this.audio.onended = () => {
      if (this._endedLock) return;

      this._endedLock = true;

      setTimeout(() => {
        this.next();
        this._endedLock = false;
      }, 100);
    };

    this.audio.onerror = () => {
      console.error("[AUDIO] Unsupported or failed source:", {
        src: this.audio.src,
        error: this.audio.error,
      });
    };
  }

  init() {
    console.log("AudioEngine initialized");
  }

  setPlaylist(list) {
    this.queue = Array.isArray(list) ? list : [];
    this.currentIndex = 0;
    this.currentTrack = this.queue[0] || null;
    this.emit();
  }

  emit() {
    this.currentTrack = this.queue[this.currentIndex] || null;

    if (this.onIndexChange) {
      this.onIndexChange(this.currentIndex);
    }

    if (this.onStateChange) {
      this.onStateChange({
        queue: this.queue,
        currentIndex: this.currentIndex,
        currentTrack: this.currentTrack,
        isPlaying: this.isPlaying,
        currentTime: this.audio.currentTime || 0,
        duration: Number.isFinite(this.audio.duration)
          ? this.audio.duration
          : 0,
      });
    }
  }

  playIndex(index) {
    if (this._isSwitching) return;
    if (!this.queue.length) return;
    if (index < 0 || index >= this.queue.length) return;

    this._isSwitching = true;
    this.currentIndex = index;
    this.currentTrack = this.queue[index];

    this.play(this.currentTrack?.src);

    setTimeout(() => {
      this._isSwitching = false;
    }, 150);
  }

  play(src) {
    if (!src) {
      console.error("[AUDIO] Missing track source");
      return;
    }

    console.log("ENGINE PLAY:", src);

    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = src;
    this.audio.load();

    this.audio
      .play()
      .catch((error) => {
        console.error("[AUDIO] Play failed:", {
          src,
          error,
        });
      });
  }

  resume() {
    if (!this.audio.src) {
      this.playIndex(this.currentIndex);
      return;
    }

    this.audio
      .play()
      .catch((error) => {
        console.error("[AUDIO] Resume failed:", error);
      });
  }

  pause() {
    this.audio.pause();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  next() {
    const nextIndex = this.currentIndex + 1;

    if (nextIndex >= this.queue.length) {
      this.pause();
      return;
    }

    this.playIndex(nextIndex);
  }

  previous() {
    const previousIndex = this.currentIndex - 1;

    if (previousIndex < 0) {
      this.audio.currentTime = 0;
      return;
    }

    this.playIndex(previousIndex);
  }

  clear() {
    this.pause();

    this.audio.removeAttribute("src");
    this.audio.load();

    this.queue = [];
    this.currentIndex = 0;
    this.currentTrack = null;
    this.isPlaying = false;

    this.emit();
  }
}

const audioEngine = new AudioEngine();
export default audioEngine;
