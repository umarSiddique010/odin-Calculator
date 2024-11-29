const display = document.getElementById("display");
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let currentInput = "";
let shouldResetDisplay = false;

function updateDisplay(value) {
    if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
    }
    currentInput = display.textContent;
}

function clearCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    currentInput = "";
    display.textContent = "0";
}

function handleOperator(operator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (currentOperator) {
        secondOperand = parseFloat(currentInput);
        const result = operate(currentOperator, firstOperand, secondOperand);
        display.textContent = result;
        firstOperand = result;
    }
    currentOperator = operator;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (!currentOperator || firstOperand === null) return;
    secondOperand = parseFloat(currentInput);
    const result = operate(currentOperator, firstOperand, secondOperand);
    display.textContent = result;
    firstOperand = result;
    currentOperator = null;
    shouldResetDisplay = true;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b === 0 ? "Error" : a / b;
        default:
            return null;
    }
}

// Event Listeners
document.querySelectorAll("button").forEach(button => {
    if (!button.classList.contains("operator") && !button.classList.contains("clear") && button.id !== "equals") {
        button.addEventListener("click", () => updateDisplay(button.textContent));
    }
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => handleOperator(button.dataset.operator));
});

document.getElementById("clear").addEventListener("click", clearCalculator);
document.getElementById("equals").addEventListener("click", handleEquals);
