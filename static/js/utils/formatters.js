/* ============================================
   PlayMood - Formatters
   Time, number, and date formatting utilities
   ============================================ */

const Formatters = {
  /**
   * Format seconds to mm:ss or hh:mm:ss
   */
  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  /**
   * Format number with comma separator (e.g., 1,234,567)
   */
  formatNumber(num) {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString('vi-VN');
  },

  /**
   * Format large numbers (e.g., 1.2M, 456K)
   */
  formatCompact(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  },

  /**
   * Format relative time (e.g., "2 giờ trước")
   */
  formatRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
    if (days < 365) return `${Math.floor(days / 30)} tháng trước`;
    return `${Math.floor(days / 365)} năm trước`;
  },

  /**
   * Format date to Vietnamese locale
   */
  formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Truncate text with ellipsis
   */
  truncate(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  }
};

if (typeof module !== 'undefined') module.exports = Formatters;
