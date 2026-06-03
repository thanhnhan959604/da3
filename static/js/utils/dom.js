/* ============================================
   PlayMood - DOM Utilities
   ============================================ */

const DOM = {
  /**
   * Query a single element
   */
  qs(selector, parent = document) {
    return parent.querySelector(selector);
  },

  /**
   * Query all elements
   */
  qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  },

  /**
   * Create an element with attributes and children
   */
  create(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => {
      if (key === 'className') el.className = val;
      else if (key === 'dataset') Object.assign(el.dataset, val);
      else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), val);
      else el.setAttribute(key, val);
    });
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child) el.appendChild(child);
    });
    return el;
  },

  /**
   * Add event listener with delegation
   */
  on(parent, event, selector, handler) {
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target && parent.contains(target)) {
        handler.call(target, e, target);
      }
    });
  },

  /**
   * Toggle class
   */
  toggleClass(el, className, force) {
    if (typeof force !== 'undefined') {
      el.classList.toggle(className, force);
    } else {
      el.classList.toggle(className);
    }
  },

  /**
   * Set CSS custom property
   */
  setCSSVar(name, value, el = document.documentElement) {
    el.style.setProperty(name, value);
  },

  /**
   * Debounce function
   */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * Throttle function
   */
  throttle(fn, delay = 100) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(this, args);
      }
    };
  }
};

// Export for use
if (typeof module !== 'undefined') module.exports = DOM;
