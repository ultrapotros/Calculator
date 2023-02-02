const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const displayContent = document.querySelector('#display');
const equalKey = document.querySelector('.equals');
const decimalKey = document.querySelector('.decimal');
const clearKey = document.querySelector('.clear');
const signKey = document.querySelector('.sign');
const smallScreen = document.querySelector('#small-screen');
const bigScreen = document.querySelector('#big-screen');
const popInst = document.querySelector('#pop-inst');
const percent = document.querySelector('.percent');
const playOptions = document.querySelectorAll('.options-container>div')
const computerOptions = document.querySelectorAll(`.computer-options>div`);
const startGame = ()=> playOptions.forEach(div=>div.addEventListener('click',userOption));
let display="0";
let previousNumber= '0';
let currentNumber= '0';
let lastOperator='';
let parcial = 0;
let total = 0;
function updateScreens(result) {
    smallScreen.textContent = display;
    bigScreen.textContent = result || currentNumber;
}
function operator(sign) {
    console.log(sign);
    console.log(display[display.length-1])
    console.log(currentNumber)
    if (currentNumber !== '0') {
        if (parcial !== 0) {
            parcial = simpleOperation(parcial,parseFloat(currentNumber),lastOperator);
            console.log(parcial)
        } else{
            parcial = parseFloat(currentNumber);
        }
        lastOperator = sign;
        currentNumber = '0'
        display = parcial.toString()+sign ;
        updateScreens()
    }
}
function decimal() {
    if (!currentNumber.includes('.')) {
        /* display += '.'; */
        currentNumber += '.'
    }
    console.log(parseFloat(currentNumber))
}
function sign() {
    if (!currentNumber.includes('-')) {
        currentNumber = `-${currentNumber}`
    } else {
        currentNumber = currentNumber.substring(1,currentNumber.length)
    }
    updateScreens();
    console.log(parseFloat(currentNumber))
}
function clear() {
    currentNumber = '0';
    previousNumber = '0';
    display = '0';
    updateScreens();
}
function equal() {
    total = simpleOperation(parcial,currentNumber,lastOperator);
    parcial = 0;
    display = '0';
    currentNumber = '0';
    updateScreens(total);
}
function simpleOperation(num1,num2,operator) {
    switch (operator) {
        case '+': 
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1)+parseFloat(num2);
        case '/': 
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1)/parseFloatt(num2);
        case '*': 
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1)*parseFloat(num2);
        case '-': 
            currentNumber = '0';
            previousNumber = '0';
            return parseFloat(num1)-parseFloat(num2);
    }
}
function percentage(previousNumber,currentNumber) {
    console.log(previousNumber*currentNumber/100) ;
    return previousNumber*currentNumber/100;
}

function nums(num) {
    if (currentNumber === '0') {
        currentNumber =num
    } else {
        currentNumber += num;
    }
    /* bigScreen.textContent = display; */
    /* displayContent.removeChild('p') */
    bigScreen.textContent = currentNumber;

}
percent.addEventListener('click', () => percentage(previousNumber,currentNumber));
equalKey.addEventListener('click', equal);
decimalKey.addEventListener('click', decimal);
signKey.addEventListener('click', sign);
clearKey.addEventListener('click', clear);
numberButtons.forEach(button=>button.addEventListener('click', () => nums(button.value)));
operatorButtons.forEach(button=>button.addEventListener('click', () => operator(button.value)));
