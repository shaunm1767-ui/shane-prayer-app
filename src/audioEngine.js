class AudioEngine {
  constructor() {
    if (!AudioEngine.instance) {
      this.audio = new Audio(); // single audio instance
      this.isPlaying = false;
      this.currentTrack = null;
      this.isSwitching = false;

      AudioEngine.instance = this;
    }

    return AudioEngine.instance;
  }

  load(src) {
    this.audio.src = src;
    this.audio.load();
  }

  async play(src) {
    try {
      console.log("ENGINE: play called", src);

      // stop collisions
      if (this.isSwitching) return;

      this.isSwitching = true;

      // if new track → reset
      if (src && this.currentTrack !== src) {
        this.audio.pause();
        this.load(src);
        this.currentTrack = src;
      }

      await this.audio.play();

      this.isPlaying = true;
      this.isSwitching = false;

    } catch (err) {
      console.log("ENGINE ERROR:", err);
      this.isSwitching = false;
    }
  }

  pause() {
    console.log("ENGINE: pause");
    this.audio.pause();
    this.isPlaying = false;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
}

// singleton lock (important)
const instance = new AudioEngine();


export default instance;