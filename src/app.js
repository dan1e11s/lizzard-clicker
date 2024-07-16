const circle = document.querySelector('#circle');
const score = document.querySelector('#score');

function start() {
  setScore(getScore());
  setImage();
}

function setScore(value) {
  localStorage.setItem('score', value);
  score.textContent = value;
}

function getScore() {
  return Number(localStorage.getItem('score')) ?? 0;
}

function addOne() {
  setScore(getScore() + 1);
  setImage();
}

function setImage() {
  if (getScore() >= 50) {
    circle.setAttribute('src', './assets/lizzard.png');
    circle.setAttribute('alt', 'lizzard');
  }
}

circle.addEventListener('click', (event) => {
  const rect = circle.getBoundingClientRect();

  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 50;

  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * DEG;

  circle.style.setProperty('--tiltX', `${tiltX}deg`);
  circle.style.setProperty('--tiltY', `${tiltY}deg`);

  setTimeout(() => {
    circle.style.setProperty('--tiltX', '0deg');
    circle.style.setProperty('--tiltY', '$0deg');
  }, 300);

  const plusOne = document.createElement('div');
  plusOne.classList.add('plus-one');
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;
  plusOne.textContent = '+1';

  circle.parentElement.appendChild(plusOne);

  addOne();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);
});

start();
