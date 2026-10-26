// Gallery viewer. Each thumbnail is a plain link to the full-size photo,
// so without JavaScript a tap simply opens the image. With JavaScript the
// photo opens in an on-page viewer with previous/next and keyboard support.
const links = Array.from(document.querySelectorAll('.photo-link'));

if (links.length && typeof HTMLDialogElement === 'function') {
  const viewer = document.createElement('dialog');
  viewer.className = 'viewer';
  viewer.setAttribute('aria-label', 'Photo viewer');
  viewer.innerHTML = `
    <img class="viewer-img" alt="">
    <p class="viewer-count" aria-live="polite"></p>
    <button class="viewer-btn viewer-close" type="button" aria-label="Close">&times;</button>
    <button class="viewer-btn viewer-prev" type="button" aria-label="Previous photo">&#8249;</button>
    <button class="viewer-btn viewer-next" type="button" aria-label="Next photo">&#8250;</button>`;
  document.body.append(viewer);

  const img = viewer.querySelector('.viewer-img');
  const count = viewer.querySelector('.viewer-count');
  let current = 0;

  const show = (index) => {
    current = (index + links.length) % links.length;
    const link = links[current];
    img.src = link.href;
    img.alt = link.querySelector('img').alt;
    count.textContent = `${current + 1} of ${links.length}`;
  };

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      show(index);
      viewer.showModal();
    });
  });

  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.viewer-prev').addEventListener('click', () => show(current - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => show(current + 1));

  // Arrow keys step through photos; Escape closes (built into <dialog>).
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // Clicking the dark backdrop closes the viewer.
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });

  // Swipe left/right on phones.
  let touchX = null;
  viewer.addEventListener('touchstart', (event) => { touchX = event.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', (event) => {
    if (touchX === null) return;
    const dx = event.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // Return focus to the thumbnail that was opened.
  viewer.addEventListener('close', () => links[current].focus());
}
