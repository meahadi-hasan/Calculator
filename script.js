let display = document.getElementById('display');
        let currentInput = '';
        let operator = null;
        let firstOperand = null;
        let shouldResetDisplay = false;

        function appendNumber(number) {
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            if (currentInput === '0' && number === 0) return;
            currentInput += number;
            if (operator && firstOperand !== null) {
                updateDisplay(`${firstOperand} ${operator} ${currentInput}`);
            } else {
                updateDisplay(currentInput);
            }
        }

        function setOperator(op) {
            if (currentInput === '') return;
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator) {
                calculateResult();
                firstOperand = parseFloat(display.textContent.split(' ')[0]);
            }
            operator = op;
            shouldResetDisplay = true;
            updateDisplay(`${firstOperand} ${operator}`);
        }

        function calculateResult() {
            if (operator && currentInput !== '') {
                let secondOperand = parseFloat(currentInput);
                let result = operate(operator, firstOperand, secondOperand);
                updateDisplay(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
                currentInput = result.toString();
                operator = null;
                firstOperand = null;
                shouldResetDisplay = true;
            }
        }

        function clearDisplay() {
            currentInput = '';
            operator = null;
            firstOperand = null;
            shouldResetDisplay = false;
            updateDisplay(0);
        }

        function updateDisplay(value) {
            display.textContent = value;
        }

        function operate(op, a, b) {
            switch (op) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return a / b;
                default: return b;
            }
        }

        function calculateSquare() {
            if (currentInput !== '') {
                let number = parseFloat(currentInput);
                let result = number * number;
                updateDisplay(`${number}² = ${result}`);
                currentInput = result.toString();
                shouldResetDisplay = true;
            }
        }

        function calculateSquareRoot() {
            if (currentInput !== '') {
                let number = parseFloat(currentInput);
                if (number >= 0) {
                    let result = Math.sqrt(number);
                    updateDisplay(`√${number} = ${result}`);
                    currentInput = result.toString();
                    shouldResetDisplay = true;
                } else {
                    updateDisplay('Error');
                }
            }
        }

        function deleteLastDigit() {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                if (operator && firstOperand !== null) {
                    updateDisplay(`${firstOperand} ${operator} ${currentInput}`);
                } else {
                    updateDisplay(currentInput);
                }
            }
        }

        function appendDecimal() {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay(currentInput);
            }
        }

        function calculatePercentage() {
            if (currentInput !== '') {
                let number = parseFloat(currentInput);
                let result = number / 100;
                updateDisplay(`${number}% = ${result}`);
                currentInput = result.toString();
                shouldResetDisplay = true;
            }
        }