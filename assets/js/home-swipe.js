(() => {
  const nav = document.querySelector('[data-home-date-nav]');
  if (!nav) {
    return;
  }

  const label = nav.querySelector('[data-home-date-label]');
  const posts = Array.from(document.querySelectorAll('.post-item[data-post-date]'));

  if (!label || posts.length === 0) {
    return;
  }

  let currentIndex = 0;

  const setActive = (index, shouldScroll) => {
    const nextIndex = Math.max(0, Math.min(index, posts.length - 1));
    posts[currentIndex]?.classList.remove('is-active');
    currentIndex = nextIndex;
    const activePost = posts[currentIndex];
    activePost.classList.add('is-active');
    label.textContent = activePost.dataset.postDate || '';

    if (shouldScroll) {
      activePost.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  setActive(0, false);

  let touchStartX = null;
  let touchStartY = null;

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    touchStartX = null;
    touchStartY = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      setActive(currentIndex + 1, true);
    } else {
      setActive(currentIndex - 1, true);
    }
  };

  nav.addEventListener('touchstart', handleTouchStart, { passive: true });
  nav.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd);
})();
