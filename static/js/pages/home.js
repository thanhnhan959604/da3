/* ============================================
   PlayMood - Home Page JS
   Carousel and dynamic content
   ============================================ */

const HomePage = {
  init() {
    this._initMoodSelector();
    this._initHorizontalScroll();
  },

  _initMoodSelector() {
    const moodBtns = document.querySelectorAll('.pm-badge[data-mood]');
    if (!moodBtns.length) return;

    moodBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all
        moodBtns.forEach(b => b.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        
        // Optional: Trigger background change based on mood
        const mood = btn.dataset.mood;
        const ambientBg = document.querySelector('.ambient-bg');
        if (ambientBg) {
          ambientBg.style.background = `var(--mood-${mood})`;
        }
      });
    });
  },

  _initHorizontalScroll() {
    const containers = document.querySelectorAll('.horizontal-scroll-container');
    
    containers.forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        container.scrollLeft = scrollLeft - walk;
      });
    });
  }
};

// Auto-init if on home page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.home-hero')) {
    HomePage.init();
  }
});

if (typeof module !== 'undefined') module.exports = HomePage;
