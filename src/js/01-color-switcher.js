
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalId = null;

function startColorChange() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
}

function stopColorChange() {
  clearInterval(intervalId);
  body.style.backgroundColor = ''; 
  startButton.disabled = false;
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);
