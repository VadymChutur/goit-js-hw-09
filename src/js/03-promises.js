const { Notify } = require('notiflix');

const refs = {
  promiseFormRef: document.querySelector('.form'),
};

const onSuccess = ({ position, delay }) => {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const onError = ({ position, delay }) => {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
};

refs.promiseFormRef.addEventListener('submit', startPromiseGen);

function startPromiseGen(e) {
  e.preventDefault();
  let position = 0;
  const { delay, step, amount } = e.target;
  let FIRST_DELAY = Number(delay.value);
  const STEP_DEALY = Number(step.value);
  const NUMBER_OF_STEPS = Number(amount.value);

  Notify.info('Launch of the bid generator :)', {
    timeout: 1000,
  });

  for (let i = 0; i < NUMBER_OF_STEPS; i += 1) {
    position += 1;
    FIRST_DELAY += STEP_DEALY;
    createPromise(position, FIRST_DELAY).then(onSuccess).catch(onError);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
