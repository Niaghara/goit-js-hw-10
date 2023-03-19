'use strict';
import '../css/common.css';


const btnStartSwitchColor = document.querySelector('button[data-start]');
const btnStopSwitchColor = document.querySelector('button[data-stop]');
const bodyBgColor = document.querySelector('body');

let timerId = null;
// btnStopSwitchColor.disabled = true;

btnStartSwitchColor.addEventListener('click', onStartSwitchColor);
btnStopSwitchColor.addEventListener('click', onStopSwitchColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartSwitchColor() {
  timerId = setInterval(() => {
    bodyBgColor.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStartSwitchColor.disabled = true;
  btnStopSwitchColor.disabled = false;
}

function onStopSwitchColor() {
  clearInterval(timerId);
  btnStartSwitchColor.disabled = false;
  btnStopSwitchColor.disabled = true;
}
