const container = document.querySelector("#container");
const buttonContainer = document.querySelector("#buttonContainer")
const screenDisplay = document.querySelector("#displayText");
document.addEventListener("touchstart", function(){}, true);

buildButtons();

var input = [];
var operatorEntered = false;

function buttonClicked(button) {
    //define input buttons that should appear on screen when clicked (basically not zero or equals)
    inputButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9","0", "+", "-", "/", "*"];
    
    //determine whether button press was input and if it was an operator
    var isInput = inputButtons.includes(button);
    var isOperate = isOperator(button);
    
    //stops user from entering two operators in a row
    if(isOperator(input[input.length-1]) && isOperate){return false;}
    
    //Clear error message, make sure input is empty
    if(screenDisplay.innerHTML == "Can't divide by zero"){
        screenDisplay.innerHTML = "";
        input = [];
    }

    //stop user from entering an operator before entering the first value
    if(input.length === 0 && isOperate == true){return;}
    
    //determine if the user has already entered a complete statement and then entered another operator, calculate complate statement if so
    if (isOperate && operatorEntered) {
            // var result = evaluate(input);
            // input = []
            // input.push(result);
            // screenDisplay.innerHTML = "";
            // screenDisplay.innerHTML = result;
            displayResult(input);
    }

    //push input to screen and input array, flag the operator entered if appropriate
    if (isInput) {
        screenDisplay.innerHTML += button;
        input.push(button);
        if (isOperate) {
            operatorEntered = true;
        }
    //clear screen if button press was clear
    } else if (button == "Clear") {
        screenDisplay.innerHTML = "";
        input = [];
        operatorEntered = false;
    //calculates statement if button press was equals and user didn't leave dangling operator
    } else if (button == "=" && isOperator(input[input.length-1]) == false) {
        displayResult(input);
    }
}
//displays result to screen, clears and replaces input array
function displayResult(displayInput) {
    var result = evaluate(displayInput);
    input = [];
    input.push(result);
    screenDisplay.innerHTML = "";
    screenDisplay.innerHTML = result;
    operatorEntered = false;
}
//determines if input button press was an operator
function isOperator(input) {
    operateButtons = ["+", "-", "*", "/"]
    return operateButtons.includes(input);
}
//takes input array, parse into variables, hand to operate function for evaluation
function evaluate(input) {
    var operatorLocation = input.findIndex(isOperator);
    var operator = input[operatorLocation];
    var firstArg = parseInt(input[0, operatorLocation - 1]);
    var secondArg = parseInt(input[operatorLocation + 1, input.length - 1]);
    return operate(operator, firstArg, secondArg);
}
//create grid of buttons with approppriate id and label, add button clicked listener.
function buildButtons() {
    buttonLabels = ["+", "-", "/", "*", 7, 8, 9, "Clear", 4, 5, 6, "=", 1, 2, 3, "0"];
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
            newDiv.addEventListener("mouseenter",function(){this.classList.add("hvr-fade");})
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
function divide(num1, num2) { 
    if(num2 == 0){
        input = [];
        return "Can't divide by zero";
    }
    return num1 / num2; 
}
//create function to call appropriate operation function based on passed operator
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