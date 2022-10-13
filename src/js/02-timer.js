import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let deadLine = null;

const TIMER_DELAY = 1000;

const refs = {
  timerRef: document.querySelector('.timer'),
  startBtnRef: document.querySelector('[data-start]'),
  dayRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
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
    deadLine = selectedDates[0].getTime();
    if (deadLine < Date.now()) {
      Notify.failure('The selected date is before todays date!', {
        closeButton: true,
        clickToClose: true,
        backOverlay: true,
      });
      refs.startBtnRef.setAttribute('disabled', false);
    } else {
      Notify.success('The selected date is greater than today!', {
        clickToClose: true,
        backOverlay: true,
      });
      refs.startBtnRef.removeAttribute('disabled');
    }
  },
};

refs.startBtnRef.addEventListener('click', startTimer);

flatpickr('#datetime-picker', options);

disableBtn();

const timer = {
  intervalId: null,
  refs: {},

  startTimer(rootSelector, date) {
    this.getRefs(rootSelector);
    this.intervalId = setInterval(() => {
      const deltaTime = deadLine - Date.now();
      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
        Notify.success('The time is up (-_-)', {
          clickToClose: true,
          backOverlay: true,
        });
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      this.refs.days.textContent = days;
      this.refs.hours.textContent = hours;
      this.refs.minutes.textContent = minutes;
      this.refs.seconds.textContent = seconds;
    }, TIMER_DELAY);
  },

  getRefs(rootSelector) {
    this.refs.days = refs.dayRef;
    this.refs.hours = refs.hoursRef;
    this.refs.minutes = refs.minutesRef;
    this.refs.seconds = refs.secondsRef;
  },
};

function startTimer() {
  timer.startTimer(refs, deadLine);
  refs.startBtnRef.setAttribute('disabled', false);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function padDays(value) {
  return String(value).padStart(3, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = padDays(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function disableBtn() {
  refs.startBtnRef.setAttribute('disabled', true);
}
