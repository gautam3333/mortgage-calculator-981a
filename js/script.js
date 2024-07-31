const amountInput = document.querySelector('.amount__input');
const amountInputBox = amountInput.parentElement;
const spanRupee = amountInputBox.children[0];
const amountError = document.querySelector('.amount__error');

// amount input focus
amountInput.addEventListener('focus', () => {
  amountInputBox.classList.add('amount__input--focus');
  spanRupee.classList.add('amount--focus');
});

amountInput.addEventListener('blur', () => {
  amountInputBox.classList.remove('amount__input--focus');
  spanRupee.classList.remove('amount--focus');
});

// function to handle submit
function handleSubmit(event) {
  event.preventDefault();
  const amount = Number(amountInput.value);

  if (!amount) {
    amountError.style.opacity = 1;
  } else {
    amountError.style.opacity = 0;
  }
}
