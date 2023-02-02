const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const displayContent = document.querySelector('#display');
const equal = document.querySelector('.equals');
const smallScreen = document.querySelector('#small-screen');
const bigScreen = document.querySelector('#big-screen');
const popInst = document.querySelector('#pop-inst');
const percent = document.querySelector('.percent');
const playOptions = document.querySelectorAll('.options-container>div')
const computerOptions = document.querySelectorAll(`.computer-options>div`);
const startGame = ()=> playOptions.forEach(div=>div.addEventListener('click',userOption));
let display="";
let previousNumber= '0';
let currentNumber= '0';
let lastOperator;
function updateScreens() {
    smallScreen.textContent = previousNumber;
    bigScreen.textContent = currentNumber;
}
function operator(sign) {
    previousNumber = currentNumber;
    currentNumber = '0';
    updateScreens();
    if (sign === lastOperator) {

    } else {
        lastOperator = sign;
    }
}
function simpleOperation(num1,num2,operator) {
    switch (operator) {
        case '+': 
            console.log(num1)
            console.log(num2)
            console.log(parseInt(num1)+parseInt(num2))
            currentNumber = '0';
            previousNumber = '0';
            return parseInt(num1)+parseInt(num2);
        case '/': 
            return num1/num2;
        case '*': 
            return num1*num2;
        case '-': 
            return num1-num2;
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
    display += num.toString();
    bigScreen.textContent = display;
    /* displayContent.removeChild('p') */
    smallScreen.textContent = currentNumber;

}
percent.addEventListener('click', () => percentage(previousNumber,currentNumber));
equal.addEventListener('click', () => simpleOperation(previousNumber,currentNumber,lastOperator));
numberButtons.forEach(button=>button.addEventListener('click', () => nums(button.value)));
operatorButtons.forEach(button=>button.addEventListener('click', () => operator(button.value)));
