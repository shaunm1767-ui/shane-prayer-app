class AudioEngine {
  constructor() {
    this.audio = new Audio();
    this.currentTrack = null;

    this.isPlaying = false;
    this.lock = false;

    this.lastPlayTime = 0;
  }

  async play(src) {
    try {
      const now = Date.now();

      // 🛑 debounce rapid clicks
      if (now - this.lastPlayTime < 300) {
        console.log("IGNORED: too fast");
        return;
      }

      // 🛑 prevent overlap
      if (this.lock) {
        console.log("IGNORED: locked");
        return;
      }

      this.lock = true;
      this.lastPlayTime = now;

      console.log("ENGINE: play called", src);

      if (src) {
        if (this.currentTrack !== src) {
          this.audio.pause();
          this.audio.src = src;
          this.currentTrack = src;
        }
      }

      await this.audio.play();

      this.isPlaying = true;
      this.lock = false;

      // 💾 SAVE CONTINUE LISTENING STATE
      localStorage.setItem("lastTrack", this.currentTrack);
      localStorage.setItem("lastTime", this.audio.currentTime);

    } catch (err) {
      console.log("ENGINE ERROR:", err);
      this.lock = false;
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.lock = false;

    // save position
    localStorage.setItem("lastTrack", this.currentTrack);
    localStorage.setItem("lastTime", this.audio.currentTime);
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  resumeLast() {
    const lastTrack = localStorage.getItem("lastTrack");
    const lastTime = localStorage.getItem("lastTime");

    if (lastTrack) {
      console.log("RESUMING:", lastTrack);

      this.audio.src = lastTrack;
      this.audio.currentTime = parseFloat(lastTime || 0);

      this.audio.play().catch(err => {
        console.log("Resume failed:", err);
      });

      this.isPlaying = true;
    }
  }
}

const audioEngine = new AudioEngine();
export default audioEngine;