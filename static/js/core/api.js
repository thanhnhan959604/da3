/* ============================================
   PlayMood - API Module (Stub)
   Simulates API calls with dummy data
   ============================================ */

const API = {
  // Simulated delay
  _delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // ---- Dummy Data ----
  tracks: [
    { id: 1, title: 'Có Chắc Yêu Là Đây', artist: 'Sơn Tùng M-TP', album: 'Sky Tour', duration: 234, cover: 'https://picsum.photos/seed/track1/300/300', genre: 'V-Pop', mood: 'chill' },
    { id: 2, title: 'Waiting For You', artist: 'MONO', album: 'Em Là', duration: 198, cover: 'https://picsum.photos/seed/track2/300/300', genre: 'V-Pop', mood: 'langman' },
    { id: 3, title: 'Nơi Này Có Anh', artist: 'Sơn Tùng M-TP', album: 'Singles', duration: 276, cover: 'https://picsum.photos/seed/track3/300/300', genre: 'Ballad', mood: 'buon' },
    { id: 4, title: 'Chạy Ngay Đi', artist: 'Sơn Tùng M-TP', album: 'Sky Tour', duration: 312, cover: 'https://picsum.photos/seed/track4/300/300', genre: 'V-Pop', mood: 'vui' },
    { id: 5, title: 'See Tình', artist: 'Hoàng Thùy Linh', album: 'LINK', duration: 186, cover: 'https://picsum.photos/seed/track5/300/300', genre: 'V-Pop', mood: 'vui' },
    { id: 6, title: 'Đừng Làm Trái Tim Anh Đau', artist: 'Sơn Tùng M-TP', album: 'Singles', duration: 258, cover: 'https://picsum.photos/seed/track6/300/300', genre: 'Ballad', mood: 'buon' },
    { id: 7, title: 'Cắt Đôi Nỗi Sầu', artist: 'Tăng Duy Tân', album: 'Singles', duration: 210, cover: 'https://picsum.photos/seed/track7/300/300', genre: 'V-Pop', mood: 'chill' },
    { id: 8, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, cover: 'https://picsum.photos/seed/track8/300/300', genre: 'Pop', mood: 'vui' },
    { id: 9, title: 'Snowman', artist: 'Sia', album: 'Everyday Is Christmas', duration: 228, cover: 'https://picsum.photos/seed/track9/300/300', genre: 'Pop', mood: 'chualanh' },
    { id: 10, title: 'Perfect', artist: 'Ed Sheeran', album: 'Divide', duration: 263, cover: 'https://picsum.photos/seed/track10/300/300', genre: 'Pop', mood: 'langman' },
    { id: 11, title: 'Âm Thầm Bên Em', artist: 'Sơn Tùng M-TP', album: 'Singles', duration: 245, cover: 'https://picsum.photos/seed/track11/300/300', genre: 'Ballad', mood: 'chualanh' },
    { id: 12, title: 'Là 1 Thằng Con Trai', artist: 'Jack - J97', album: 'Singles', duration: 222, cover: 'https://picsum.photos/seed/track12/300/300', genre: 'V-Pop', mood: 'chill' },
  ],

  playlists: [
    { id: 1, name: 'Chill Buổi Tối', description: 'Nhạc nhẹ nhàng cho đêm thanh bình', cover: 'https://picsum.photos/seed/pl1/300/300', trackCount: 25, mood: 'chill' },
    { id: 2, name: 'Chữa Lành Tâm Hồn', description: 'Healing music cho những ngày mệt mỏi', cover: 'https://picsum.photos/seed/pl2/300/300', trackCount: 30, mood: 'chualanh' },
    { id: 3, name: 'Năng Lượng Tích Cực', description: 'Bắt đầu ngày mới đầy năng lượng', cover: 'https://picsum.photos/seed/pl3/300/300', trackCount: 18, mood: 'vui' },
    { id: 4, name: 'Lãng Mạn Bên Anh/Em', description: 'Nhạc tình yêu ngọt ngào', cover: 'https://picsum.photos/seed/pl4/300/300', trackCount: 22, mood: 'langman' },
    { id: 5, name: 'Tập Trung Học Bài', description: 'Lo-fi beats để tập trung', cover: 'https://picsum.photos/seed/pl5/300/300', trackCount: 40, mood: 'taptrung' },
    { id: 6, name: 'Rainy Day Vibes', description: 'Nghe khi trời mưa', cover: 'https://picsum.photos/seed/pl6/300/300', trackCount: 15, mood: 'buon' },
  ],

  moods: [
    { id: 'vui', label: 'Vui Vẻ', gradient: 'var(--mood-vui)' },
    { id: 'buon', label: 'Buồn', gradient: 'var(--mood-buon)' },
    { id: 'chill', label: 'Chill', gradient: 'var(--mood-chill)' },
    { id: 'chualanh', label: 'Chữa Lành', gradient: 'var(--mood-chualanh)' },
    { id: 'taptrung', label: 'Tập Trung', gradient: 'var(--mood-taptrung)' },
    { id: 'langman', label: 'Lãng Mạn', gradient: 'var(--mood-langman)' },
  ],

  users: [
    { id: 1, name: 'Minh Anh', avatar: 'https://i.pravatar.cc/150?u=user1', online: true, listening: 'See Tình - Hoàng Thùy Linh' },
    { id: 2, name: 'Hải Đăng', avatar: 'https://i.pravatar.cc/150?u=user2', online: true, listening: 'Blinding Lights - The Weeknd' },
    { id: 3, name: 'Thu Hà', avatar: 'https://i.pravatar.cc/150?u=user3', online: true, listening: 'Snowman - Sia' },
    { id: 4, name: 'Đức Phúc', avatar: 'https://i.pravatar.cc/150?u=user4', online: false, listening: null },
    { id: 5, name: 'Ngọc Trâm', avatar: 'https://i.pravatar.cc/150?u=user5', online: true, listening: 'Perfect - Ed Sheeran' },
  ],

  comments: [
    { id: 1, userId: 1, user: 'Minh Anh', avatar: 'https://i.pravatar.cc/150?u=user1', rating: 5, text: 'Bài này nghe chữa lành quá! Cứ mỗi khi buồn lại bật lên nghe', time: '2026-05-28T10:30:00' },
    { id: 2, userId: 2, user: 'Hải Đăng', avatar: 'https://i.pravatar.cc/150?u=user2', rating: 4, text: 'Beat hay, vocal tuyệt vời. Recommend cho mọi người!', time: '2026-05-27T15:20:00' },
    { id: 3, userId: 3, user: 'Thu Hà', avatar: 'https://i.pravatar.cc/150?u=user3', rating: 5, text: 'Nghe đi nghe lại không chán, đặc biệt là khi trời mưa', time: '2026-05-26T08:45:00' },
    { id: 4, userId: 5, user: 'Ngọc Trâm', avatar: 'https://i.pravatar.cc/150?u=user5', rating: 4, text: 'Giai điệu nhẹ nhàng, lời bài hát ý nghĩa. Chữa lành thật sự!', time: '2026-05-25T20:00:00' },
    { id: 5, userId: 4, user: 'Đức Phúc', avatar: 'https://i.pravatar.cc/150?u=user4', rating: 3, text: 'Cũng được, nhưng mình thích bản acoustic hơn.', time: '2026-05-24T12:10:00' },
  ],

  genres: ['V-Pop', 'Ballad', 'Pop', 'R&B', 'Lo-Fi', 'Indie', 'Rock', 'Jazz', 'Classical', 'EDM'],
  artists: ['Sơn Tùng M-TP', 'MONO', 'Hoàng Thùy Linh', 'Jack - J97', 'Tăng Duy Tân', 'The Weeknd', 'Ed Sheeran', 'Sia'],

  // ---- API Methods ----
  async getTracks(filters = {}) {
    await this._delay();
    let result = [...this.tracks];
    if (filters.mood) result = result.filter(t => t.mood === filters.mood);
    if (filters.genre) result = result.filter(t => t.genre === filters.genre);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.artist.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async getTrackById(id) {
    await this._delay(200);
    return this.tracks.find(t => t.id === id);
  },

  async getPlaylists(mood) {
    await this._delay();
    if (mood) return this.playlists.filter(p => p.mood === mood);
    return this.playlists;
  },

  async getFriends() {
    await this._delay(200);
    return this.users;
  },

  async getComments(trackId) {
    await this._delay();
    return this.comments;
  },

  async search(query) {
    await this._delay(150);
    const q = query.toLowerCase();
    return {
      tracks: this.tracks.filter(t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)).slice(0, 4),
      artists: this.artists.filter(a => a.toLowerCase().includes(q)).slice(0, 3),
      playlists: this.playlists.filter(p => p.name.toLowerCase().includes(q)).slice(0, 3),
    };
  }
// ---- New UI Stubs ----
  async followUser(userId) {
    console.log('Follow user', userId);
    return { success: true };
  },
  async unfollowUser(userId) {
    console.log('Unfollow user', userId);
    return { success: true };
  },
  async searchByEmail(email) {
    console.log('Search by email', email);
    // Mock response
    return [{ id: 99, name: 'Demo User', email }];
  },
  async isVerifiedArtist(userId) {
    // Mock: only userId 1 is verified
    return userId === 1;
  },
};

if (typeof module !== 'undefined') module.exports = API;
