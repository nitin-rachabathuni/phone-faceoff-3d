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
}
