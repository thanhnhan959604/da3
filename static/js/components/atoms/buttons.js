/* ============================================
   PlayMood - Buttons JS
   Ripple effect and generic button behaviors
   ============================================ */

const Buttons = {
  init() {
    this._initRipples();
  },

  _initRipples() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.pm-btn, .ripple, .auth-social-btn, .bottom-nav-item');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      btn.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
  }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => Buttons.init());

if (typeof module !== 'undefined') module.exports = Buttons;
