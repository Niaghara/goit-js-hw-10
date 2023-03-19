import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};


function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
   
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}
refs.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const position = Number(refs. inputAmount.value);
  let delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);

  for (let i = 1; i <= position; i += 1){

  createPromise(i, delay)

  .then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
  delay = delay + step;
}
})

