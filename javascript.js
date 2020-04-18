const container = document.querySelector("#container");
const buttonContainer = document.querySelector("#buttonContainer")
const screenDisplay = document.querySelector("#displayText");

buildButtons();

var input = [];
var operatorEntered = false;

function buttonClicked(button) {
    inputButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "*"];
    var isInput = inputButtons.includes(button);
    var isOperate = isOperator(button);
    if(isOperator(input[input.length-1]) && isOperate){return false;}
    if (isOperate) {
        if (operatorEntered) {
            var result = evaluate(input);
            input = []
            input.push(result);
            screenDisplay.innerHTML = "";
            screenDisplay.innerHTML = result;
        }
    }

    if (isInput) {
        screenDisplay.innerHTML += button;
        input.push(button);
        if (isOperate) {
            operatorEntered = true;
        }
    } else if (button == "Clear") {
        screenDisplay.innerHTML = "";
        input = [];
        operatorEntered = false;
    } else if (button == "=") {
        displayResult(input);
    }
}
function displayResult(displayInput) {
    var result = evaluate(displayInput);
    input = [];
    input.push(result);
    screenDisplay.innerHTML = "";
    screenDisplay.innerHTML = result;
    operatorEntered = false;
}
function isOperator(input) {
    operateButtons = ["+", "-", "*", "/"]
    return operateButtons.includes(input);
}
function evaluate(input) {
    var operatorLocation = input.findIndex(isOperator);
    console.log(input);
    var operator = input[operatorLocation];
    var firstArg = parseInt(input[0, operatorLocation - 1]);
    var secondArg = parseInt(input[operatorLocation + 1, input.length - 1]);
    return operate(operator, firstArg, secondArg);
}
function buildButtons() {
    buttonLabels = ["+", "-", "/", "*", 1, 2, 3, "Clear", 4, 5, 6, "=", 7, 8, 9, "0"];
    k = 0;
    var toAdd = document.createDocumentFragment();
    for (var i = 1; i <= 4; i++) {
        var newRow = document.createElement('div');
        newRow.className = 'buttonRow';
        for (var j = 1; j <= 4; j++) {
            var newDiv = document.createElement('div');
            var id = buttonLabels[k];
            newDiv.className = 'button';
            newDiv.id = id;
            newDiv.addEventListener("click", function () { buttonClicked(this.id) });
            newDiv.innerHTML = `<p class = buttonText>${id}</div>`;
            k++;
            newRow.appendChild(newDiv);
        }
        toAdd.appendChild(newRow);
    }
    buttonContainer.appendChild(toAdd);
}
//create four functions for basic operations
function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }
//create function to call appropriate operation function
function operate(operator, num1, num2) {
    switch (operator) {
        case "add":
        case "+":
            return add(num1, num2);
        case "subtract":
        case "-":
            return subtract(num1, num2);
        case "multiply":
        case "*":
            return multiply(num1, num2);
        case "divide":
        case "/":
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}