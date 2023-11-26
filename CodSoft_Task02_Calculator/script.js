// Get the switch and the elements to toggle
const switchInput = document.getElementById("mode-toggle");
const scientificButtons = document.querySelectorAll(".function");

// Initialize to false (Scientific Mode off)
switchInput.checked = false;

// Function to handle the switch change
function handleSwitchChange() {
    const isScientificMode = switchInput.checked;
    scientificButtons.forEach(button => {
        button.style.display = isScientificMode ? "block" : "none";
    });
}

// Add an event listener to the switch
switchInput.addEventListener("change", handleSwitchChange);
handleSwitchChange();

const resultInput = document.getElementById("result");

// Flag if decimal point is already used
let decimalUsed = false;
 
// Function to update the result input
function updateResult(value) {
    resultInput.value = value;
}
 
// Handle digit and operator button
const buttons = document.querySelectorAll(".digit, .operator, .decimal");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;
        const currentValue = resultInput.value;
        
        if (buttonValue === '.' && decimalUsed) { return; }
        if (buttonValue === '.') { decimalUsed = true; }
         
        const newValue = currentValue + buttonValue;
        updateResult(newValue);
    });
});
 
// Handle clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    updateResult("");
    decimalUsed = false;
});
 
// Handle equal button
const equalButton = document.getElementById("equal");
equalButton.addEventListener("click", () => {
    try {
        const expression = resultInput.value;
        const result = eval(expression);
        updateResult(result);
    } catch (error) {
        updateResult("Error");
    }
});

// Handle function button
const functionButtons = document.querySelectorAll(".function");
functionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const functionName = button.textContent;
        const currentValue = parseFloat(resultInput.value);

        switch (functionName) {
            case "√":
                if (currentValue >= 0) {
                    updateResult(Math.sqrt(currentValue));
                } else {
                    updateResult("Error");
                }
                break;
            case "^":
                updateResult(currentValue ** 2);
                break;
            case "sin":
                updateResult(Math.sin(currentValue));
                break;
            case "cos":
                updateResult(Math.cos(currentValue));
                break;
            case "tan":
                updateResult(Math.tan(currentValue));
                break;
            default:
                break;
        }
    });
});