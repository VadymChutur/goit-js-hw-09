const DELAY_TIME = 1000;

const refs = {
  stopBtn: document.querySelector('[data-stop]'),
  startBtn: document.querySelector('[data-start]'),
  bodyChangeColor: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', startRandomSwitcher);
refs.stopBtn.addEventListener('click', stopRandomSwitcher);

function startRandomSwitcher() {
  timerId = setInterval(() => {
    refs.bodyChangeColor.style.backgroundColor = getRandomHexColor();
  }, DELAY_TIME);
}

function stopRandomSwitcher() {
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
