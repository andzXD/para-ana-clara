// PERSONALIZE: troque somente o ano abaixo, caso a primeira mensagem tenha sido em outro ano.
const firstMessage = new Date(2026, 7, 9, 17, 31, 0);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load', () => {
  window.setTimeout(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('ready');
  }, reduceMotion ? 0 : 1300);
});

function updateCounter() {
  const elapsed = Math.max(0, Date.now() - firstMessage.getTime());
  const totalMinutes = Math.floor(elapsed / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  document.querySelector('#days').textContent = days;
  document.querySelector('#hours').textContent = hours;
  document.querySelector('#minutes').textContent = minutes;
}
updateCounter();
setInterval(updateCounter, 30000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const secretButton = document.querySelector('#secretButton');
const secretMessage = document.querySelector('#secretMessage');
secretButton.addEventListener('click', () => {
  const open = secretMessage.classList.toggle('show');
  secretButton.classList.toggle('open', open);
  secretButton.setAttribute('aria-expanded', open);
  secretButton.innerHTML = open ? 'guardado para sempre <span>♥</span>' : 'abrir meu coração <span>♡</span>';
});

const yesButton = document.querySelector('#yesButton');
const noButton = document.querySelector('#noButton');
const answerArea = document.querySelector('#answerArea');
const yesMessage = document.querySelector('#yesMessage');
function moveNoButton() {
  const area = answerArea.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  noButton.classList.add('fleeing');
  const x = Math.max(5, Math.random() * (area.width - button.width - 10));
  const y = Math.max(5, Math.random() * (area.height - button.height - 10));
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}
noButton.addEventListener('pointerenter', moveNoButton);
noButton.addEventListener('pointerdown', (event) => { event.preventDefault(); moveNoButton(); });
yesButton.addEventListener('click', () => {
  yesMessage.classList.add('show');
  yesButton.textContent = 'Eu também escolho você! ♥';
  noButton.style.display = 'none';
  for (let i = 0; i < 25; i += 1) setTimeout(createHeart, i * 65);
});

const hearts = document.querySelector('#hearts');
function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = Math.random() > 0.3 ? '♥' : '✦';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  hearts.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}
for (let i = 0; i < 8; i += 1) setTimeout(createHeart, i * 900);
setInterval(createHeart, 1800);

const music = document.querySelector('#backgroundMusic');
const musicButton = document.querySelector('#musicButton');
musicButton.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); musicButton.classList.add('playing'); musicButton.setAttribute('aria-pressed', 'true'); musicButton.setAttribute('aria-label', 'Pausar música ambiente'); }
    catch { alert('Adicione um arquivo chamado musica.mp3 nesta pasta para usar a música.'); }
  } else { music.pause(); musicButton.classList.remove('playing'); musicButton.setAttribute('aria-pressed', 'false'); musicButton.setAttribute('aria-label', 'Ativar música ambiente'); }
});
