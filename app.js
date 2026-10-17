// Tilt on pointer move, flip on click. No dependencies.
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${px * 22}deg`);
    card.style.setProperty('--rx', `${-py * 22}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--rx', '0deg');
  });
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// Demo mode for recording: ?demo=1 auto-tilts and flips cards in sequence.
if (new URLSearchParams(location.search).get('demo') === '1') {
  const seq = ['iphone', 'pixel', 'galaxy'];
  let i = 0;
  const step = () => {
    const key = seq[i % seq.length];
    const c = document.querySelector(`[data-phone="${key}"]`);
    cards.forEach((x) => x.classList.remove('flipped'));
    c.style.setProperty('--ry', '14deg');
    c.style.setProperty('--rx', '-6deg');
    setTimeout(() => c.classList.add('flipped'), 700);
    setTimeout(() => { c.style.setProperty('--ry', '0deg'); c.style.setProperty('--rx', '0deg'); }, 2600);
    i += 1;
  };
  step();
  setInterval(step, 3400);

  // On-page captions for the reel (timings match reel_script voiceover).
  const caps = [
    [0.3, 4.8, 'Three flagships.', 'One honest take.'],
    [4.8, 13.5, 'iPhone Duo. $1,999. Gorgeous.', 'Not fold-ready? Users see your broken layout first.'],
    [13.5, 24.5, 'Pixel 11 Pro. Slower chip. Best camera.', '7 years of updates. The one I carry.'],
    [24.5, 31.5, 'Galaxy S26. Fastest, lightest, cheapest.', 'Gamers, just buy it.'],
    [31.5, 41, 'Pure CSS 3D. No framework.', 'Link in bio. Fork it.'],
  ];
  const box = document.createElement('div');
  box.className = 'caption';
  box.innerHTML = '<b></b><span></span>';
  document.body.appendChild(box);
  const t0 = performance.now();
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    const c = caps.find(([a, b]) => t >= a && t < b);
    if (c) { box.firstChild.textContent = c[2]; box.lastChild.textContent = c[3]; box.classList.add('on'); }
    else box.classList.remove('on');
    requestAnimationFrame(tick);
  };
  tick();
}
