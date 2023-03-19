import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let selectedMsDates = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedMsDates = selectedDates[0].getTime();
    if (selectedMsDates < new Date()) {
      // window.alert("Please choose a date in the future");
      Notiflix.Notify.failure('Please choose a date in the future.');
      return;
    }

    startBtn.disabled = false;
    console.log(selectedDates[0]);
  },
};

flatpickr(timePicker, options);

let object = {};

const timer = () => {
  intervalId = setInterval(() => {
    const delta = selectedMsDates - new Date().getTime();
    if (delta <= 0) {
      clearTimeout(intervalId);
      return;
    }
    object = convertMs(delta);
    onChangeTimer(object);
  }, 1000);
};

function onChangeTimer({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}
// function onChangeTimer({ days, hours, minutes, seconds }) {
//   daysRef.textContent = days.toString().length === 2 ? days : `0${days}`;
//   hoursRef.textContent = hours.toString().length === 2 ? hours : `0${hours}`;
//   minutesRef.textContent =
//     minutes.toString().length === 2 ? minutes : `0${minutes}`;
//   secondsRef.textContent =
//     seconds.toString().length === 2 ? seconds : `0${seconds}`;
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

startBtn.addEventListener('click', timer);
