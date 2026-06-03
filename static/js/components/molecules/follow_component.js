// Follow/Unfollow button component
export function renderFollowButton(container, userId, isFollowing = false) {
  const btn = document.createElement('button');
  btn.className = 'pm-btn follow-btn';
  btn.textContent = isFollowing ? 'Following' : 'Follow';
  btn.onclick = async () => {
    // UI‑only toggle; real API call to be added later
    isFollowing = !isFollowing;
    btn.textContent = isFollowing ? 'Following' : 'Follow';
    btn.classList.toggle('following', isFollowing);
    // optimistic UI call
    if (isFollowing) {
      window.api.followUser(userId);
    } else {
      window.api.unfollowUser(userId);
    }
  };
  container.appendChild(btn);
}
