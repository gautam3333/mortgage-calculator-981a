const amountInput = document.querySelector('.amount__input');
const amountInputBox = amountInput.parentElement;
const spanRupee = amountInputBox.children[0];
const amountError = document.querySelector('.amount__error');

const termInput = document.querySelector('.term__input');
const termInputBox = termInput.parentElement;
const spanYears = termInputBox.children[1];
const termError = document.querySelector('.term__error');

const rateInput = document.querySelector('.rate__input');
const rateInputBox = rateInput.parentElement;
const spanPercent = rateInputBox.children[1];
const rateError = document.querySelector('.rate__error');

// amount input focus
amountInput.addEventListener('focus', () => {
  amountInputBox.classList.add('amount__input--focus');
  spanRupee.classList.add('amount--focus');
});

amountInput.addEventListener('blur', () => {
  amountInputBox.classList.remove('amount__input--focus');
  spanRupee.classList.remove('amount--focus');
});

// term and rate focus
termInput.addEventListener('focus', () => {
  termInputBox.classList.add('term--focus');
  spanYears.classList.add('years--focus');
});

termInput.addEventListener('blur', () => {
  termInputBox.classList.remove('term--focus');
  spanYears.classList.remove('years--focus');
});

rateInput.addEventListener('focus', () => {
  rateInputBox.classList.add('rate--focus');
  spanPercent.classList.add('percent--focus');
});

rateInput.addEventListener('blur', () => {
  rateInputBox.classList.remove('rate--focus');
  spanPercent.classList.remove('percent--focus');
});

// function to handle submit
function handleSubmit(event) {
  event.preventDefault();
  const amount = Number(amountInput.value);
  const term = Number(termInput.value);
  const rate = Number(rateInput.value);

  if (!amount) {
    amountError.style.opacity = 1;
  } else {
    amountError.style.opacity = 0;
  }

  if (!term) {
    termError.style.opacity = 1;
  } else {
    amountError.style.opacity = 0;
  }

  if (!rate) {
    rateError.style.opacity = 1;
  } else {
    rateError.style.opacity = 0;
  }
}
