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
const btnsNotClear = document.querySelectorAll('input.i');
const operatorArray = ['+', '-', '×', '÷'];
let displayValue = document.querySelector('div#display > p');

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
btnDecimal.addEventListener('click', () => {
    // this check will cause problems
    // maybe fix by splitting str into array between operators?
    if (displayValue.textContent.includes('.')) return;
    display(btnDecimal.value)
});
btnDivide.addEventListener('click', () => {display(' ' + btnDivide.value + ' ')});
btnMultiply.addEventListener('click', () => {display(' ' + btnMultiply.value + ' ')});
btnSubtract.addEventListener('click', () => {display(' ' + btnSubtract.value + ' ')});
btnAdd.addEventListener('click', () => {display(' ' + btnAdd.value + ' ')});

btnBackspace.addEventListener('click', () => {
    backspace(1);
    if (checkOperator()) {
        backspace(2);
    }
});
btnClear.addEventListener('click', () => {
    displayValue.textContent = '';
    btnsNotClear.forEach(btn => {btn.disabled = false});
});

btnEquals.addEventListener('click', () => {calculate()});

window.addEventListener('keydown', e => {
    switch (e.code) {
        case 'KeyC':
            btnClear.click();
            break;
        case 'KeyX':
            btnMultiply.click();
            break;
    }

    switch (e.key) {
        case '1':
            btn1.click();
            break;
        case '2':
            btn2.click();
            break;
        case '3':
            btn3.click();
            break;
        case '4':
            btn4.click();
            break;
        case '5':
            btn5.click();
            break;
        case '6':
            btn6.click();
            break;
        case '7':
            btn7.click();
            break;
        case '8':
            btn8.click();
            break;
        case '9':
            btn9.click();
            break;
        case '0':
            btn0.click();
            break;
        case '.':
            btnDecimal.click();
            break;
        case 'Enter':
            document.activeElement.blur();
            btnEquals.click();
            break;
        case '=':
            btnEquals.click();
            break;
        case 'Backspace':
            btnBackspace.click();
            break;
        case '/':
            btnDivide.click();
            break;
        case '*':
            btnMultiply.click();
            break;
        case '-':
            btnSubtract.click();
            break;
        case '+':
            btnAdd.click();
            break;
    }
});

// functions

function calculate() {
    let numArray = displayValue.textContent.split(/ \+ | - | × | ÷ /);
    let opArray = displayValue.textContent.split(/[0123456789\.]/);
    opArray = removeSpaces(opArray);
    if (checkInvalid(numArray, opArray)) {
        console.log('INVALID');
        return;
    }
    console.log(numArray);
    console.log(opArray);
    console.log('VALID');
}

function checkInvalid(numArray, opArray) {
    if (numArray.includes('') && numArray.length > 1) {
        return true;
    }
}

function removeSpaces(array) {
    let newArray = array;
    newArray = newArray.filter(value => value !== '');
    newArray = newArray.map(value => value[1]);
    return newArray;
}

function display(input) {
    if (displayValue.clientWidth >= 320) return;
    displayValue.textContent += input;
}

function backspace(num) {
    displayValue.textContent = displayValue.textContent
    .substring(0, displayValue.textContent.length - num);
}

function checkOperator() {
    return operatorArray.includes(displayValue
    .textContent[displayValue.textContent.length - 1])
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