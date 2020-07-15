// variables

const btn0 = document.querySelector('input[value="0"]');
const btn1 = document.querySelector('input[value="1"]');
const btn2 = document.querySelector('input[value="2"]');
const btn3 = document.querySelector('input[value="3"]');
const btn4 = document.querySelector('input[value="4"]');
const btn5 = document.querySelector('input[value="5"]');
const btn6 = document.querySelector('input[value="6"]');
const btn7 = document.querySelector('input[value="7"]');
const btn8 = document.querySelector('input[value="8"]');
const btn9 = document.querySelector('input[value="9"]');
const btnDecimal = document.querySelector('input[value="."]');
const btnBackspace = document.querySelector('input[value="⌫"]');
const btnEquals = document.querySelector('input[value="="]');
const btnDivide = document.querySelector('input[value="÷"]');
const btnMultiply = document.querySelector('input[value="×"]');
const btnSubtract = document.querySelector('input[value="-"]');
const btnAdd = document.querySelector('input[value="+"]');
const btnClear = document.querySelector('input[value="C"]');
let displayValue = document.querySelector('div#display > p');
displayValue.textContent = ''

// event listeners

btn0.addEventListener('click', () => {display(btn0.value)});
btn1.addEventListener('click', () => {display(btn1.value)});
btn2.addEventListener('click', () => {display(btn2.value)});
btn3.addEventListener('click', () => {display(btn3.value)});
btn4.addEventListener('click', () => {display(btn4.value)});
btn5.addEventListener('click', () => {display(btn5.value)});
btn6.addEventListener('click', () => {display(btn6.value)});
btn7.addEventListener('click', () => {display(btn7.value)});
btn8.addEventListener('click', () => {display(btn8.value)});
btn9.addEventListener('click', () => {display(btn9.value)});
btnDecimal.addEventListener('click', () => {display(btnDecimal.value)});

btnBackspace.addEventListener('click', () => {
    displayValue.textContent = displayValue.textContent
    .substring(0, displayValue.textContent.length - 1);
});
btnClear.addEventListener('click', () => {
    displayValue.textContent = '';
});



document.addEventListener('keydown', e => {
    switch (e.code) {
        case 'Digit0':
            btn0.click();
            break;
        case 'Digit1':
            btn1.click();
            break;
        case 'Digit2':
            btn2.click();
            break;
        case 'Digit3':
            btn3.click();
            break;
        case 'Digit4':
            btn4.click();
            break;
        case 'Digit5':
            btn5.click();
            break;
        case 'Digit6':
            btn6.click();
            break;
        case 'Digit7':
            btn7.click();
            break;
        case 'Digit8':
            btn8.click();
            break;
        case 'Digit9':
            btn9.click();
            break;
        case 'Period':
            btnDecimal.click();
            break;
        case 'KeyC':
            btnClear.click();
            break;
        case 'Enter':
            btnEquals.click();
            break;
        case 'Equal':
            btnEquals.click();
            break;
        case 'Backspace':
            btnBackspace.click();
            break;
        case 'Slash':
            btnDivide.click();
            break;
        case 'KeyX':
            btnMultiply.click();
            break;
        case 'Minus':
            btnSubtract.click();
            break;
    }

    switch (e.key) {
        case '*':
            btnMultiply.click();
            break;
        case '+':
            btnAdd.click();
            break;
    }
});

// functions

function display(input) {
    displayValue.textContent += input;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return 'ERROR';
    }
}

function add(a, b) {return a + b}

function subtract(a, b) {return a - b}

function multiply(a, b) {return a * b}

function divide(a, b) {return a / b}