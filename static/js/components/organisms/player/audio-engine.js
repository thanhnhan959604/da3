/* ============================================
   PlayMood - Audio Engine
   Simulated audio player (no actual audio files)
   ============================================ */

const AudioEngine = {
  _interval: null,
  _progressCallbacks: [],

  /**
   * Initialize audio engine
   */
  init() {
    // Listen for state changes
    Store.on('isPlaying', (isPlaying) => {
      if (isPlaying) this._startProgress();
      else this._stopProgress();
    });

    Store.on('currentTrack', (track) => {
      if (track) {
        Store.set('duration', track.duration);
        Store.set('currentTime', 0);
      }
    });
  },

  /**
   * Simulate progress advancement
   */
  _startProgress() {
    this._stopProgress();
    this._interval = setInterval(() => {
      const currentTime = Store.get('currentTime');
      const duration = Store.get('duration');
      
      if (currentTime >= duration) {
        const repeatMode = Store.get('repeatMode');
        if (repeatMode === 'one') {
          Store.set('currentTime', 0);
        } else {
          Store.nextTrack();
        }
        return;
      }

      Store.set('currentTime', currentTime + 1);
    }, 1000);
  },

  _stopProgress() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  },

  /**
   * Seek to position
   */
  seek(time) {
    Store.set('currentTime', Math.max(0, Math.min(time, Store.get('duration'))));
  },

  /**
   * Set volume (0-1)
   */
  setVolume(vol) {
    Store.set('volume', Math.max(0, Math.min(1, vol)));
    Store.set('isMuted', vol === 0);
  },

  /**
   * Toggle mute
   */
  toggleMute() {
    Store.set('isMuted', !Store.get('isMuted'));
  }
};

if (typeof module !== 'undefined') module.exports = AudioEngine;
