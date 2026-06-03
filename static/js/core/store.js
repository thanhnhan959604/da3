/* ============================================
   PlayMood - State Store
   Simple state management for the app
   ============================================ */

const Store = {
  _state: {
    currentTrack: null,
    queue: [],
    queueIndex: 0,
    isPlaying: false,
    volume: 0.7,
    isMuted: false,
    isShuffle: false,
    repeatMode: 'off', // 'off', 'all', 'one'
    currentTime: 0,
    duration: 0,
    currentMood: null,
    user: {
      id: 1,
      name: 'Thanh',
      email: 'thanh@playmood.vn',
      avatar: 'https://i.pravatar.cc/150?u=me',
    },
    likedTracks: new Set([1, 3, 5, 8, 10]),
  },

  _listeners: new Map(),

  /**
   * Get state value
   */
  get(key) {
    return this._state[key];
  },

  /**
   * Set state value and notify listeners
   */
  set(key, value) {
    const oldValue = this._state[key];
    this._state[key] = value;
    this._notify(key, value, oldValue);
  },

  /**
   * Subscribe to state changes
   */
  on(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);
    return () => this._listeners.get(key).delete(callback);
  },

  /**
   * Notify listeners of state change
   */
  _notify(key, newValue, oldValue) {
    if (this._listeners.has(key)) {
      this._listeners.get(key).forEach(cb => cb(newValue, oldValue));
    }
  },

  /**
   * Toggle liked track
   */
  toggleLike(trackId) {
    const liked = this._state.likedTracks;
    if (liked.has(trackId)) {
      liked.delete(trackId);
    } else {
      liked.add(trackId);
    }
    this._notify('likedTracks', liked);
    return liked.has(trackId);
  },

  /**
   * Check if track is liked
   */
  isLiked(trackId) {
    return this._state.likedTracks.has(trackId);
  },

  /**
   * Set queue and start playing
   */
  playQueue(tracks, startIndex = 0) {
    this.set('queue', tracks);
    this.set('queueIndex', startIndex);
    this.set('currentTrack', tracks[startIndex]);
    this.set('isPlaying', true);
    this.set('currentTime', 0);
  },

  /**
   * Play next track
   */
  nextTrack() {
    const queue = this._state.queue;
    let nextIndex = this._state.queueIndex + 1;
    
    if (this._state.isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (nextIndex >= queue.length) {
      if (this._state.repeatMode === 'all') {
        nextIndex = 0;
      } else {
        this.set('isPlaying', false);
        return;
      }
    }

    this.set('queueIndex', nextIndex);
    this.set('currentTrack', queue[nextIndex]);
    this.set('currentTime', 0);
  },

  /**
   * Play previous track
   */
  prevTrack() {
    const queue = this._state.queue;
    let prevIndex = this._state.queueIndex - 1;
    
    if (prevIndex < 0) {
      if (this._state.repeatMode === 'all') {
        prevIndex = queue.length - 1;
      } else {
        prevIndex = 0;
        this.set('currentTime', 0);
        return;
      }
    }

    this.set('queueIndex', prevIndex);
    this.set('currentTrack', queue[prevIndex]);
    this.set('currentTime', 0);
  },

  /**
   * Toggle play/pause
   */
  togglePlay() {
    this.set('isPlaying', !this._state.isPlaying);
  },

  /**
   * Toggle shuffle
   */
  toggleShuffle() {
    this.set('isShuffle', !this._state.isShuffle);
  },

  /**
   * Cycle repeat mode
   */
  cycleRepeat() {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(this._state.repeatMode);
    this.set('repeatMode', modes[(currentIndex + 1) % modes.length]);
  }
};

if (typeof module !== 'undefined') module.exports = Store;
