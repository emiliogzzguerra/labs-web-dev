let displayText = '0';
let globalOperation = '';
let firstElement = 0;
let secondElement = 0;
let hasClickedANumberAfterClear = false;
let currentOperation = '';

const updateElements = (currentValue) => {
    if(currentOperation == '') {
        firstElement = parseFloat(currentValue);
    } else {
        secondElement = parseFloat(currentValue);
    }
}

const numericInput = (numberKey) => {
    if (hasClickedANumberAfterClear) {
        displayText = displayText + wordToNumberKey[numberKey].toString();
    } else {
        displayText = wordToNumberKey[numberKey].toString();
        hasClickedANumberAfterClear = true;
    }
    updateElements(displayText);
    document.querySelector('#display').innerHTML = displayText;
}

const cleanGlobalVariables = () => {
    globalOperation = '';
    currentOperation = '';
    hasClickedANumberAfterClear = false;
    firstElement = 0;
    secondElement = 0;
}

const computeOperation = () => {
    let result;
    switch(currentOperation) {
        case 'division':
            result = (firstElement / secondElement);
            break;
        case 'multiplication':
            result = (firstElement * secondElement);
            break;
        case 'minus':
            result = (firstElement - secondElement);
            break;
        case 'plus':
            result = (firstElement + secondElement);
            break;
        default:
            break;
    }
    displayText = result.toString();
    document.querySelector('#display').innerHTML = displayText;
    globalOperation += `${secondElement} = ${result} `;
    console.log(globalOperation);
    cleanGlobalVariables();
}

const click = (ev) => {
    switch(ev.target.id) {
        case 'clear':
            console.log('\nnew operation...\n');
            hasClickedANumberAfterClear = false;
            displayText = '0';
            document.querySelector('#display').innerHTML = displayText;
            break;
        case 'sign':
            if (displayText !== 0) {
                let numericValue = parseFloat(displayText);
                numericValue = -numericValue;
                displayText = numericValue.toString();
                document.querySelector('#display').innerHTML = displayText;
                if (firstElement == 0) {
                    firstElement = numericValue;
                }
            }
            break;
        case 'percentage':
            if (displayText !== 0) {
                let numericValue = parseFloat(displayText);
                numericValue = numericValue / 100;
                displayText = numericValue.toString();
                document.querySelector('#display').innerHTML = displayText;
            }
            break;
        case 'division':
            globalOperation += `${firstElement.toString()} / `;
            currentOperation = 'division';
            displayText = "0";
            document.querySelector('#display').innerHTML = displayText;
            hasClickedANumberAfterClear = false;
            break;
        case 'multiplication':
            globalOperation += `${firstElement.toString()} * `;
            currentOperation = 'multiplication';
            displayText = "0";
            document.querySelector('#display').innerHTML = displayText;
            hasClickedANumberAfterClear = false;
            break;
        case 'minus':
            globalOperation += `${firstElement.toString()} - `;
            currentOperation = 'minus';
            displayText = "0";
            document.querySelector('#display').innerHTML = displayText;
            hasClickedANumberAfterClear = false;
            break;
        case 'plus':
            globalOperation += `${firstElement.toString()} + `;
            currentOperation = 'plus';
            displayText = "0";
            document.querySelector('#display').innerHTML = displayText;
            hasClickedANumberAfterClear = false;
            break;
        case 'dot':
            if (hasClickedANumberAfterClear) {
                displayText = displayText + '.';
                document.querySelector('#display').innerHTML = displayText;
            }
            break;
        case 'equals':
            computeOperation(currentOperation);
            break;
        default:
            numericInput(ev.target.id);
            break;
    }
}

const buttons = ['clear','sign','percentage','division','seven','eight','nine','multiplication','four','five','six','minus','one','two','three','plus','zero','dot','equals'];

const wordToNumberKey = {
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'four': 4,
    'five': 5,
    'six': 6,
    'one': 1,
    'two': 2,
    'three': 3,
    'zero': 0,
}

document.querySelector('#display').innerHTML = "0";

for (let i = 0; i<buttons.length; i++) {
    document.querySelector(`#${buttons[i]}`).addEventListener("click", click)
}