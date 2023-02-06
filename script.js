const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalKey = document.querySelector('.equals');
const decimalKey = document.querySelector('.decimal');
const clearKey = document.querySelector('#clear');
const partialClearKey = document.querySelector('#partialClear');
const signKey = document.querySelector('.sign');
const smallScreen = document.querySelector('#small-screen');
const bigScreen = document.querySelector('#big-screen');
const percent = document.querySelector('.percent');

let display = "0";
let previousNumber = 0;
let currentNumber = '0';
let lastOperator = '';
let parcial = 0;
let total = 0;
let maxDigits;

function updateScreens(result) {
    smallScreen.textContent = display;
    bigScreen.textContent = result || currentNumber;
}

function operator(sign) {
    previousNumber = parseFloat(currentNumber);
    if (parcial !== 0) {
        parcial = simpleOperation(parcial, parseFloat(currentNumber), lastOperator);
    } else {
        parcial = parseFloat(currentNumber);
    }
    lastOperator = sign;
    currentNumber = '0'
    display = parcial.toString() + sign;
    updateScreens()
}

function decimal() {
    if (currentNumber === '0') {
        currentNumber = '0.';
        maxDigits = 11;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.'
    }
}

function sign() {
    if (currentNumber !== '0') {
        if (!currentNumber.includes('-')) {
            currentNumber = `-${currentNumber}`
        } else {
            currentNumber = currentNumber.substring(1, currentNumber.length)
        }
        updateScreens();
    }

}

function clear() {
    currentNumber = '0';
    previousNumber = '0';
    parcial = 0;
    display = '0';
    updateScreens();
}

function partialClear() {
    currentNumber = '0';
    updateScreens();
}

function equal() {
    total = simpleOperation(parcial, currentNumber, lastOperator);
    parcial = 0;
    display = '0';
    currentNumber = '0';
    updateScreens(total);
}

function simpleOperation(num1, num2, operator) {
    switch (operator) {
        case '+':
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1) + parseFloat(num2);
        case '/':
            if (num1 === 0 && num2 === '0') {
                return 'oops!'
            }
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1) / parseFloat(num2);
        case '*':
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1) * parseFloat(num2);
        case '-':
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1) - parseFloat(num2);
    }
}

function percentage() {
    if (parcial !== 0 && currentNumber !== '0') {
        let baseNum = parcial !== 0 ? parcial : previousNumber;
        let percentResult = parseFloat(baseNum) * parseFloat(currentNumber) / 100;
        currentNumber = percentResult.toString();
        display += currentNumber;
        currentNumber = 0;
        parcial += percentResult;
        updateScreens(percentResult);
    }
}

function nums(num) {
    if (currentNumber === '0') {
        currentNumber = num;
        maxDigits = 11;
    } else {
        if (maxDigits > 0) {
            currentNumber += num;
            maxDigits--;
        } else {
            display = "max digits reached"
            updateScreens();
        }
    }
    bigScreen.textContent = currentNumber;
}

percent.addEventListener('click', () => percentage());
equalKey.addEventListener('click', equal);
decimalKey.addEventListener('click', decimal);
signKey.addEventListener('click', sign);
clearKey.addEventListener('click', clear);
partialClearKey.addEventListener('click', partialClear);
numberButtons.forEach(button => button.addEventListener('click', () => nums(button.value)));
operatorButtons.forEach(button => button.addEventListener('click', () => operator(button.value)));
