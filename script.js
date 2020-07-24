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
const btns = document.querySelectorAll('input');
const operatorArray = ['+', '-', '×', '÷'];
const displayValue = document.querySelector('div#display > p');
const displayText = () => displayValue.textContent;

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
btnDivide.addEventListener('click', () => {display(' ' + btnDivide.value + ' ')});
btnMultiply.addEventListener('click', () => {display(' ' + btnMultiply.value + ' ')});
btnSubtract.addEventListener('click', () => {display(' ' + btnSubtract.value + ' ')});
btnAdd.addEventListener('click', () => {display(' ' + btnAdd.value + ' ')});

btnBackspace.addEventListener('click', () => {
    displayValue.textContent = backspace(1, displayText());
    if (checkOperator(displayText())) {
        displayValue.textContent = backspace(2, displayText());
    }
});

btnClear.addEventListener('click', () => {
    displayValue.textContent = '';
});

btnEquals.addEventListener('click', () => {
    if (displayText() === 'ERR') return;
    const solution = calculate(displayText());
    // if (solution === 'ERR') return;
    btnClear.click();
    display(solution);
    displayValue.classList.add('solution');
});

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

function calculate(input) {
    const valid = checkValid(input);
    if (valid === false) {
        console.log('INVALID');
        return 'ERR';
    } else if (valid === 'divide0') {
        alert('nope');
        console.log('VERY INVALID');
        return 'ERR';
    }
    console.log('VALID');
    
    const equation = parseInput(input);
    console.log('raw input:', input);
    console.log('parsed input:', JSON.stringify(equation));
    displayValue.classList.add('solution');
    return evaluate(equation);
}

// this function took me 5 hours
function evaluate(equation) {
    if (typeof equation === 'number') return equation;
    let solution = evaluate(equation[0]);

    for (let i = 0; i < equation.length - 2; i += 2) {
        const op = equation[i+1];
        const num = evaluate(equation[i+2]);
        solution = operate(op, solution, num);
    }

    return solution;
}

function parseInput(input) {
    // input would be something like '1 + 1 * 1 - 1'
    let eq = input.split(' ');
    // convert numbers in equation to number data type
    eq = eq.map((x, index) => index % 2 === 0 ? +x : x);

    // move operations with priority into their own arrays ex. [1,'+',[1,'*',1],'-',1]
    let mdIndexes = []; // md = multiply & divide
    let mdSlices = [];
    eq.forEach((value, i) => {
        if (value === '×' || value === '÷') mdIndexes.push(i);
    });
    while (mdIndexes.length > 0) {
        const startIndex = 0;
        const endIndex = mdIndexes.findIndex((n, i) => mdIndexes[i+1] - n !== 2);
        mdSlices.push([mdIndexes[startIndex], mdIndexes[endIndex]]);
        mdIndexes.splice(startIndex, endIndex + 1);
    }
    mdSlices.forEach(mdSlice => {
        const startIndex = mdSlice[0] - 1; // inclusive
        const endIndex = mdSlice[1] + 2; // exclusive
        const length = endIndex - startIndex;
        const slice = eq.slice(startIndex, endIndex);
        eq.splice(startIndex, length, slice);
        // add nulls to keep eq length the same
        for (let i = 0; i < length - 1; i++) {
            eq.splice(startIndex, 0, null);
        }
    });
    eq = eq.filter(x => x !== null);

    return eq;
}

function display(input) {
    if (displayValue.classList.contains('solution')) {
        btnClear.click();
        displayValue.classList.remove('solution');
    }
    if (displayValue.clientWidth / displayValue.parentElement.clientWidth >= .91) return;
    displayValue.textContent += input;
}

function checkValid(input) {
    let valid = true;
    const nums = input.split(/ \+ | - | × | ÷ /);
    const ops = removeSpaces(input.split(/[0123456789\.]/));

    // check for multiple operators in a row
    if (nums.includes('') && nums.length > 1) valid = false;

    // check for multiple decimals in a number or digitless decimal
    if (nums.some(value => { 
        return value === '.' || value.split('.').length > 2;
    })) valid = false;

    // check for dividing by 0
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === '÷' && parseFloat(nums[i + 1]) === 0) valid = 'divide0';
    }

    return valid;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
    }
}

function add(a, b) {return a + b}

function subtract(a, b) {return a - b}

function multiply(a, b) {return a * b}

function divide(a, b) {return a / b}

function removeSpaces(array) {
    let newArray = [...array];
    newArray = newArray.filter(value => value !== '');
    newArray = newArray.map(value => value[1]);
    return newArray;
}

function backspace(num, str) {
    return str.substring(0, str.length - num);
}

function checkOperator(str) {
    return operatorArray.includes(str[str.length - 1])
}