import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let deadLine = null;

const refs = {
  timerRef: document.querySelector('.timer'),
  startBtnRef: document.querySelector('[data-start]'),
};

const options = {
  //   minDate: 'today',
  //   maxDate: new Date().fp_incr(14),
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const numSelectedDates = selectedDates[0].getTime();
    if (numSelectedDates < Date.now()) {
      Notify.failure('The selected date is before todays date!', {
        closeButton: true,
        clickToClose: true,
      });
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  refs: {},

  startTimer(rootSelector, deadLine) {
    const deltaTime = deadLine - Date.now;
    if (deltaTime <= 0) {
    }
  },
};

timer.startTimer(timerRef, deadLine);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
