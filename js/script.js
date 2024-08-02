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

const radioError = document.querySelector('.radio__error');

const imageText = document.querySelector('.image-text');
const calculationContainer = document.querySelector('.calculation');

const monthlyPaymentBox = document.querySelector('.monthly-payment h2');
const totalPaymentBox = document.querySelector('.monthly-payment h3');
const pContainer = document.querySelector(
  '.monthly-payment .repayment-or-interest'
);

const reset = document.querySelector('.reset');

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

// radio button focus
document
  .querySelectorAll('.radio__group input[type="radio"]')
  .forEach((radio) => {
    radio.addEventListener('change', function () {
      document.querySelectorAll('.radio__group').forEach((group) => {
        group.classList.remove('checked');
      });

      if (radio.checked) {
        radio.closest('.radio__group').classList.add('checked');
      }
    });
  });

// function to handle submit
function handleSubmit(event) {
  event.preventDefault();
  const amount = Number(amountInput.value);
  const term = Number(termInput.value);
  const rate = Number(rateInput.value);

  if (!amount) {
    amountError.style.opacity = 1;
    amountInputBox.classList.add('amount__input--error');
    spanRupee.classList.add('amount--error');
  } else {
    amountError.style.opacity = 0;
    amountInputBox.classList.remove('amount__input--error');
    spanRupee.classList.remove('amount--error');
  }

  if (!term) {
    termError.style.opacity = 1;
    termInputBox.classList.add('term__input--error');
    spanYears.classList.add('years--error');
  } else {
    amountError.style.opacity = 0;
    termInputBox.classList.remove('term__input--error');
    spanYears.classList.remove('years--error');
  }

  if (!rate) {
    rateError.style.opacity = 1;
    rateInputBox.classList.add('rate__input--error');
    spanPercent.classList.add('percent--error');
  } else {
    rateError.style.opacity = 0;
    rateInputBox.classList.remove('rate__input--error');
    spanPercent.classList.remove('percent--error');
  }

  // show error message for button when it is not selected
  const radios = document.querySelectorAll('.radio__group input[type="radio"]');
  let isChecked = false;
  let type = null;
  radios.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
      type = radio.value;
    }
  });

  if (isChecked) {
    radioError.style.opacity = 0;
  } else {
    radioError.style.opacity = 1;
  }

  const result = calculateMortgageDetails(amount, term, rate);
  let { monthlyPayment, totalPayment, totalInterest } = result;
  monthlyPayment = format(monthlyPayment);
  totalPayment = format(totalPayment);
  totalInterest = format(totalInterest);

  // console.log(monthlyPayment);
  // console.log(totalPayment);
  // console.log(totalInterest);

  // hide image text and show calculation container
  if (amount && term && rate) {
    imageText.classList.add('image-text--close');
    monthlyPaymentBox.textContent = monthlyPayment;
    if (type === 'repayment') {
      pContainer.textContent = 'Total amount you will repay over the term';
      totalPaymentBox.textContent = totalPayment;
    } else if (type === 'interest') {
      pContainer.textContent =
        'Total amount of interest you will pay over the term';
      totalPaymentBox.textContent = totalInterest;
    }

    calculationContainer.classList.add('calculation--open');
  }
}

// function to compute the mortgage
function calculateMortgageDetails(amount, term, rate) {
  let monthlyInterestRate = rate / 100 / 12;
  let numberOfPayments = term * 12;

  let monthlyPayment =
    (amount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  let totalPayment = monthlyPayment * numberOfPayments;
  let totalInterest = totalPayment - amount;

  return { monthlyPayment, totalPayment, totalInterest };
}

// function to format the number
function format(number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(number);
}

// reset all fields
reset.addEventListener('click', function () {
  const radios = document.querySelectorAll('.radio__group input[type="radio"]');
  amountInput.value = '';
  termInput.value = '';
  rateInput.value = '';

  radios.forEach((radio) => {
    radio.checked = false;
  });
  imageText.classList.remove('image-text--close');
  calculationContainer.classList.remove('calculation--open');
});
