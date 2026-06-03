/* ============================================
   PlayMood - Search Bar Component
   ============================================ */

const SearchBar = {
  init() {
    const searchInput = document.querySelector('.pm-search-input');
    const suggestions = document.querySelector('.search-suggestions');
    const clearBtn = document.querySelector('.pm-search-clear');

    if (!searchInput || !suggestions) return;

    // Debounced search
    const handleSearch = DOM.debounce(async (query) => {
      if (query.length < 2) {
        suggestions.classList.remove('active');
        return;
      }

      const results = await API.search(query);
      this._renderSuggestions(suggestions, results);
      suggestions.classList.add('active');
    }, 250);

    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value.trim());
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-bar-wrapper')) {
        suggestions.classList.remove('active');
      }
    });

    // Clear button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        suggestions.classList.remove('active');
        searchInput.focus();
      });
    }

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        suggestions.classList.remove('active');
        searchInput.blur();
      }
    });
  },

  _renderSuggestions(container, results) {
    let html = '';

    if (results.tracks.length) {
      html += '<div class="search-suggestion-section">';
      html += '<div class="search-suggestion-label">Bài hát</div>';
      results.tracks.forEach(track => {
        html += `
          <div class="search-suggestion-item" data-track-id="${track.id}">
            <img class="search-suggestion-img" src="${track.cover}" alt="${track.title}">
            <div class="search-suggestion-info">
              <div class="search-suggestion-title">${track.title}</div>
              <div class="search-suggestion-subtitle">${track.artist}</div>
            </div>
            <span class="search-suggestion-type">Bài hát</span>
          </div>`;
      });
      html += '</div>';
    }

    if (results.artists.length) {
      html += '<div class="search-suggestion-section">';
      html += '<div class="search-suggestion-label">Nghệ sĩ</div>';
      results.artists.forEach(artist => {
        html += `
          <div class="search-suggestion-item">
            <div class="search-suggestion-img rounded" style="background:var(--bg-elevated); display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:18px;">🎤</div>
            <div class="search-suggestion-info">
              <div class="search-suggestion-title">${artist}</div>
              <div class="search-suggestion-subtitle">Nghệ sĩ</div>
            </div>
            <span class="search-suggestion-type">Nghệ sĩ</span>
          </div>`;
      });
      html += '</div>';
    }

    if (results.playlists.length) {
      html += '<div class="search-suggestion-section">';
      html += '<div class="search-suggestion-label">Playlist</div>';
      results.playlists.forEach(pl => {
        html += `
          <div class="search-suggestion-item">
            <img class="search-suggestion-img" src="${pl.cover}" alt="${pl.name}">
            <div class="search-suggestion-info">
              <div class="search-suggestion-title">${pl.name}</div>
              <div class="search-suggestion-subtitle">${pl.trackCount} bài hát</div>
            </div>
            <span class="search-suggestion-type">Playlist</span>
          </div>`;
      });
      html += '</div>';
    }

    if (!html) {
      html = '<div class="search-suggestion-section" style="padding: 24px; text-align: center; color: var(--text-muted);">Không tìm thấy kết quả</div>';
    }

    container.innerHTML = html;

    // Bind click events on suggestions
    container.querySelectorAll('.search-suggestion-item[data-track-id]').forEach(item => {
      item.addEventListener('click', () => {
        const trackId = parseInt(item.dataset.trackId);
        const track = API.tracks.find(t => t.id === trackId);
        if (track) {
          Store.playQueue(API.tracks, API.tracks.indexOf(track));
        }
        container.classList.remove('active');
      });
    });
  }
};

if (typeof module !== 'undefined') module.exports = SearchBar;
