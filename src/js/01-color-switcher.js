const DELAY_TIME = 1000;
let timerId = null;

const refs = {
  stopBtn: document.querySelector('[data-stop]'),
  startBtn: document.querySelector('[data-start]'),
  bodyChangeColor: document.querySelector('body'),
};

disableBtn();

refs.startBtn.addEventListener('click', startRandomSwitcher);
refs.stopBtn.addEventListener('click', stopRandomSwitcher);

function startRandomSwitcher() {
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    refs.bodyChangeColor.style.backgroundColor = getRandomHexColor();
  }, DELAY_TIME);
}

function stopRandomSwitcher() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disableBtn() {
  refs.stopBtn.setAttribute('disabled', true);
}
