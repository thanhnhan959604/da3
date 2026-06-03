/* ============================================
   PlayMood - Player UI Controller
   ============================================ */

const PlayerUI = {
  els: {},

  init() {
    // Cache DOM elements
    this.els = {
      bar: document.querySelector('.player-bar'),
      cover: document.querySelector('.player-cover'),
      title: document.querySelector('.player-track-title'),
      artist: document.querySelector('.player-track-artist'),
      playBtn: document.querySelector('.player-btn-main'),
      prevBtn: document.querySelector('.player-btn-prev'),
      nextBtn: document.querySelector('.player-btn-next'),
      shuffleBtn: document.querySelector('.player-btn-shuffle'),
      repeatBtn: document.querySelector('.player-btn-repeat'),
      progressBar: document.querySelector('.player-progress-bar'),
      progressFill: document.querySelector('.player-progress-fill'),
      timeElapsed: document.querySelector('.player-time-elapsed'),
      timeDuration: document.querySelector('.player-time-duration'),
      volumeSlider: document.querySelector('.player-volume-slider'),
      volumeFill: document.querySelector('.player-volume-fill'),
      volumeBtn: document.querySelector('.player-btn-volume'),
      likeBtn: document.querySelector('.player-like-btn'),
      // Fullscreen player elements
      fsOverlay: document.querySelector('.player-fullscreen'),
      fsCover: document.querySelector('.player-fs-cover'),
      fsTitle: document.querySelector('.player-fs-title'),
      fsArtist: document.querySelector('.player-fs-artist'),
    };

    this._bindEvents();
    this._bindStoreListeners();
    
    // Initialize with first track from API data
    if (typeof API !== 'undefined' && API.tracks.length > 0) {
      Store.playQueue(API.tracks, 0);
      Store.set('isPlaying', false);
    }
  },

  _bindEvents() {
    // Play/Pause
    if (this.els.playBtn) {
      this.els.playBtn.addEventListener('click', () => Store.togglePlay());
    }

    // Prev/Next
    if (this.els.prevBtn) {
      this.els.prevBtn.addEventListener('click', () => Store.prevTrack());
    }
    if (this.els.nextBtn) {
      this.els.nextBtn.addEventListener('click', () => Store.nextTrack());
    }

    // Shuffle
    if (this.els.shuffleBtn) {
      this.els.shuffleBtn.addEventListener('click', () => Store.toggleShuffle());
    }

    // Repeat
    if (this.els.repeatBtn) {
      this.els.repeatBtn.addEventListener('click', () => Store.cycleRepeat());
    }

    // Progress bar click
    if (this.els.progressBar) {
      this.els.progressBar.addEventListener('click', (e) => {
        const rect = this.els.progressBar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        AudioEngine.seek(ratio * Store.get('duration'));
      });
    }

    // Volume slider
    if (this.els.volumeSlider) {
      this.els.volumeSlider.addEventListener('click', (e) => {
        const rect = this.els.volumeSlider.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        AudioEngine.setVolume(ratio);
      });
    }

    // Volume mute toggle
    if (this.els.volumeBtn) {
      this.els.volumeBtn.addEventListener('click', () => AudioEngine.toggleMute());
    }

    // Like button
    if (this.els.likeBtn) {
      this.els.likeBtn.addEventListener('click', () => {
        const track = Store.get('currentTrack');
        if (track) {
          const isLiked = Store.toggleLike(track.id);
          this._updateLikeButton(isLiked);
        }
      });
    }

    // Mobile: click player bar to open fullscreen
    if (this.els.bar && window.innerWidth < 768) {
      this.els.bar.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          this._toggleFullscreen(true);
        }
      });
    }

    // Close fullscreen
    const fsCloseBtn = document.querySelector('.player-fs-close');
    if (fsCloseBtn) {
      fsCloseBtn.addEventListener('click', () => this._toggleFullscreen(false));
    }

    // Swipe gestures on mobile
    this._initSwipeGestures();
  },

  _bindStoreListeners() {
    Store.on('currentTrack', (track) => this._updateTrackInfo(track));
    Store.on('isPlaying', (playing) => this._updatePlayButton(playing));
    Store.on('currentTime', (time) => this._updateProgress(time));
    Store.on('volume', (vol) => this._updateVolume(vol));
    Store.on('isShuffle', (shuffle) => this._updateShuffle(shuffle));
    Store.on('repeatMode', (mode) => this._updateRepeat(mode));
  },

  _updateTrackInfo(track) {
    if (!track) return;
    if (this.els.cover) this.els.cover.src = track.cover;
    if (this.els.title) this.els.title.textContent = track.title;
    if (this.els.artist) this.els.artist.textContent = track.artist;
    if (this.els.timeDuration) this.els.timeDuration.textContent = Formatters.formatTime(track.duration);
    if (this.els.fsCover) this.els.fsCover.src = track.cover;
    if (this.els.fsTitle) this.els.fsTitle.textContent = track.title;
    if (this.els.fsArtist) this.els.fsArtist.textContent = track.artist;
    
    // Update like button
    this._updateLikeButton(Store.isLiked(track.id));

    // Update document title
    document.title = `${track.title} - ${track.artist} | PlayMood`;
  },

  _updatePlayButton(playing) {
    if (!this.els.playBtn) return;
    const icon = playing ? 
      '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>' :
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    this.els.playBtn.innerHTML = icon;
  },

  _updateProgress(time) {
    const duration = Store.get('duration');
    if (!duration) return;
    const percent = (time / duration) * 100;
    if (this.els.progressFill) this.els.progressFill.style.width = percent + '%';
    if (this.els.timeElapsed) this.els.timeElapsed.textContent = Formatters.formatTime(time);
  },

  _updateVolume(vol) {
    if (this.els.volumeFill) this.els.volumeFill.style.width = (vol * 100) + '%';
  },

  _updateShuffle(shuffle) {
    if (this.els.shuffleBtn) {
      this.els.shuffleBtn.classList.toggle('active', shuffle);
    }
  },

  _updateRepeat(mode) {
    if (!this.els.repeatBtn) return;
    this.els.repeatBtn.classList.toggle('active', mode !== 'off');
    // Could update icon based on mode
  },

  _updateLikeButton(isLiked) {
    if (!this.els.likeBtn) return;
    this.els.likeBtn.classList.toggle('liked', isLiked);
    if (isLiked) {
      this.els.likeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      this.els.likeBtn.classList.add('like-bounce');
      setTimeout(() => this.els.likeBtn.classList.remove('like-bounce'), 400);
    } else {
      this.els.likeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    }
  },

  _toggleFullscreen(show) {
    if (this.els.fsOverlay) {
      this.els.fsOverlay.classList.toggle('active', show);
      document.body.style.overflow = show ? 'hidden' : '';
    }
  },

  _initSwipeGestures() {
    if (!this.els.bar) return;
    let startX = 0;
    let startY = 0;

    this.els.bar.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    this.els.bar.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      // Only horizontal swipes (not vertical)
      if (Math.abs(diffX) > 60 && Math.abs(diffY) < 40) {
        if (diffX > 0) Store.prevTrack();
        else Store.nextTrack();
      }
    }, { passive: true });
  }
};

if (typeof module !== 'undefined') module.exports = PlayerUI;
