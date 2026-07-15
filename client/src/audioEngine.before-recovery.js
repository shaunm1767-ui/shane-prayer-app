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

    this.audio.onended = () => {
      if (this._endedLock) return;

      this._endedLock = true;

      setTimeout(() => {
        this.next();
        this._endedLock = false;
      }, 100);
    };
  }

  init() {
    console.log("AudioEngine initialized");
  }

  setPlaylist(list) {
    this.queue = list || [];
    this.currentIndex = 0;
    this.emit();
  }

  emit() {
    if (this.onIndexChange) {
      this.onIndexChange(this.currentIndex);
    }
  }

  playIndex(index) {
    if (this._isSwitching) return;

    if (!this.queue.length) return;
    if (index < 0 || index >= this.queue.length) return;

    this._isSwitching = true;

    this.currentIndex = index;
    const track = this.queue[this.currentIndex];

    this.emit();
    this.play(track.src);

    setTimeout(() => {
      this._isSwitching = false;
    }, 150);
  }

  play(src) {
    if (!src) return;

    console.log("ENGINE PLAY:", src);

    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = "";
    this.audio.load();

    setTimeout(() => {
      this.audio.src = src;
      this.audio.load();

      this.audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(err => {
          console.log("PLAY ERROR:", err);
        });
    }, 50);
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  next() {
    this.playIndex(this.currentIndex + 1);
  }

  previous() {
    this.playIndex(this.currentIndex - 1);
  }

  clear() {
    this.pause();
    this.queue = [];
    this.currentIndex = 0;
    this.currentTrack = null;
  }
}

const audioEngine = new AudioEngine();
export default audioEngine;