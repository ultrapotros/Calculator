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
const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorsArray = ['+', '-', '*', '/'];
const otherKeysArray = ['Delete', 'Enter', 'Backspace', '%', '='];

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
    if (lastOperator !== '=') {
        if (parcial !== 0) {
            parcial = simpleOperation(parcial, previousNumber, lastOperator);
        } else {
            parcial = parseFloat(currentNumber);
        }
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
            currentNumber = `-${currentNumber}`;
        } else {
            currentNumber = currentNumber.substring(1, currentNumber.length);
        }
        updateScreens();
    }
}

function clear() {
    lastOperator = '';
    currentNumber = '0';
    previousNumber = 0;
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
    lastOperator = '=';
    parcial = total;
    display = '0';
    currentNumber = '0';
    updateScreens(total);
}

function simpleOperation(num1, num2, operator) {
    currentNumber = '0';
    previousNumber = 0;
    switch (operator) {
        case '+':
            return parseFloat(num1) + parseFloat(num2);
        case '/':
            if (num1 === 0 && num2 === 0) {
                return 'oops!';
            }
            let eliminateExtraZeros = (parseFloat(num1) / parseFloat(num2)).toFixed(6).toString();
            for (let i = eliminateExtraZeros.length - 1; i > 2; i--) {
                if (eliminateExtraZeros[i] === '0') {
                    eliminateExtraZeros = eliminateExtraZeros.slice(0, eliminateExtraZeros.length - 1);
                } else {
                    i = 0;
                }
            }
            return parseFloat(eliminateExtraZeros);
        case '*':
            return parseFloat(num1) * parseFloat(num2);
        case '-':
            return parseFloat(num1) - parseFloat(num2);
    }
}

function percentage() {
    if (parcial !== 0 && currentNumber !== '0') {
        let baseNum = parcial !== 0 ? parcial : previousNumber;
        let percentResult = parseFloat(baseNum) * parseFloat(currentNumber) / 100;
        currentNumber = percentResult.toString();
        display += currentNumber;
        currentNumber = '0';
        parcial += percentResult;
        updateScreens(percentResult);
    }
}

function nums(num) {
    if (lastOperator === '=') {
        parcial = 0;
        currentNumber = '0';
        lastOperator = '';
    }
    if (currentNumber === '0') {
        currentNumber = num;
        maxDigits = 11;
    } else {
        if (maxDigits > 0) {
            currentNumber += num;
            maxDigits--;
        } else {
            display = "max digits reached";
            updateScreens();
        }
    }
    bigScreen.textContent = currentNumber;
}

function filterKeys(key) {
    if (numbersArray.includes(key)) nums(key);
    if (operatorsArray.includes(key)) operator(key);
    if (otherKeysArray.includes(key)) {
        switch (key) {
            case 'Delete':
                clear();
                break
            case 'Backspace':
                partialClear();
                break
            case 'Enter' || '=':
                equal();
                break
            case '%':
                percentage();
                break
        }
    }
}

percent.addEventListener('click', () => percentage());
equalKey.addEventListener('click', equal);
decimalKey.addEventListener('click', decimal);
signKey.addEventListener('click', sign);
clearKey.addEventListener('click', clear);
partialClearKey.addEventListener('click', partialClear);
numberButtons.forEach(button => button.addEventListener('click', () => nums(button.value)));
operatorButtons.forEach(button => button.addEventListener('click', () => operator(button.value)));
document.addEventListener('keydown', (e) => filterKeys(e.key));
