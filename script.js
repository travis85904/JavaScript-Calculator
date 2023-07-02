class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.currentOperand = '';
        this.previousOperand = '';
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.currentOperandText.innerText = '';
        this.previousOperandText.innerText = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    invertNumber() {
        this.currentOperand = this.currentOperand * -1;
    }

    appendNumber(number) {
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '')
            return;
        this.operation = operation;
        this.previousOperand = this.currentOperand + operation;
        this.currentOperand = '';
    }

    calculate() {
        const firstNumber = parseFloat(this.previousOperand);
        const secondNumber = parseFloat(this.currentOperand);
        let result;

        switch (this.operation) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = ((firstNumber * 1000) * (secondNumber * 1000)) / 1000000;
                break;
            case '/':
                result = firstNumber / secondNumber;
                break;
            case 'mod':
                result = ((firstNumber * 100) % (secondNumber * 100)) / 100;
                break;
        }

        this.previousOperandText.innerText = firstNumber + this.operation + secondNumber + '=';
        this.currentOperandText.innerText = result;
        this.previousOperand = result;
    }

    updateDisplay() {
        this.previousOperandText.innerText = this.previousOperand;
        this.currentOperandText.innerText = this.currentOperand;
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const negativeButton = document.querySelector('[data-negative]')

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
equalsButton.addEventListener('click', () => {
    calculator.calculate();
})
negativeButton.addEventListener('click', () => {
    calculator.invertNumber();
    calculator.updateDisplay();
})