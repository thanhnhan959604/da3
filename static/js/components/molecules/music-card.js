/* ============================================
   PlayMood - Music Card Molecule
   Behaviors for music cards (play, like, context menu)
   ============================================ */

const MusicCard = {
  init() {
    document.addEventListener('click', (e) => {
      // Handle play button click
      const playBtn = e.target.closest('.music-card-play-btn');
      if (playBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = playBtn.closest('.music-card');
        const trackId = card.dataset.trackId;
        
        if (trackId && typeof Store !== 'undefined' && typeof API !== 'undefined') {
          const track = API.tracks.find(t => t.id == trackId);
          if (track) {
            Store.playQueue([track], 0);
          }
        }
        return;
      }

      // Handle like button click
      const likeBtn = e.target.closest('.music-card-like');
      if (likeBtn) {
        e.preventDefault();
        e.stopPropagation();
        likeBtn.classList.toggle('liked');
        
        const svg = likeBtn.querySelector('svg');
        if (likeBtn.classList.contains('liked')) {
          svg.outerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        } else {
          svg.outerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>';
        }
        return;
      }
      
      // Handle card click (navigate to detail)
      const card = e.target.closest('.music-card');
      if (card && card.dataset.url) {
        window.location.href = card.dataset.url;
      }
    });
  }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => MusicCard.init());

if (typeof module !== 'undefined') module.exports = MusicCard;
