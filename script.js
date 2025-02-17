let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let awaitingSecondOperand = false;

const display = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');
const colorSelectorNumbers = document.getElementById('colorSelectorNumbers');
const colorSelectorOthers = document.getElementById('colorSelectorOthers');

// Select number and non-number buttons
const numberButtons = document.querySelectorAll('.calculator-keys button:not(.operator):not(.equal-sign):not(.all-clear):not(.decimal)');
const otherButtons = document.querySelectorAll('.calculator-keys button.operator, .calculator-keys button.equal-sign, .calculator-keys button.all-clear, .calculator-keys button.decimal');

const updateDisplay = () => {
  display.value = awaitingSecondOperand ? secondOperand : firstOperand;
};

const resetCalculator = () => {
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  awaitingSecondOperand = false;
  updateDisplay();
};

const inputNumber = (number) => {
  if (awaitingSecondOperand) {
    secondOperand += number;
  } else {
    firstOperand += number;
  }
  updateDisplay();
};

const inputDecimal = () => {
  if (awaitingSecondOperand) {
    if (!secondOperand.includes('.')) {
      secondOperand += '.';
    }
  } else if (!firstOperand.includes('.')) {
    firstOperand += '.';
  }
  updateDisplay();
};

const calculate = () => {
  let result;
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);

  if (Number.isNaN(first) || Number.isNaN(second)) return;

  switch (currentOperator) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '*':
      result = first * second;
      break;
    case '/':
      result = first / second;
      break;
    default:
      return;
  }

  firstOperand = String(result);
  secondOperand = '';
  awaitingSecondOperand = false;
  currentOperator = null;
  updateDisplay();
};

const inputOperator = (operator) => {
  if (!firstOperand) return;

  if (secondOperand) {
    calculate();
  }

  currentOperator = operator;
  awaitingSecondOperand = true;
};

keys.addEventListener('click', (event) => {
  const { target } = event;
  const { value } = target;

  if (!target.matches('button')) return;

  switch (value) {
    case 'all-clear':
      resetCalculator();
      break;
    case '=':
      calculate();
      break;
    case '.':
      inputDecimal();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      inputOperator(value);
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputNumber(value);
      }
  }
});

// Change number button colors dynamically
colorSelectorNumbers.addEventListener('change', (event) => {
  const selectedColor = event.target.value;
  numberButtons.forEach(button => {
    button.style.backgroundColor = selectedColor;
  });
});

// Change non-number button colors dynamically
colorSelectorOthers.addEventListener('change', (event) => {
  const selectedColor = event.target.value;
  otherButtons.forEach(button => {
    button.style.backgroundColor = selectedColor;
  });
});

document.addEventListener('DOMContentLoaded', updateDisplay);
