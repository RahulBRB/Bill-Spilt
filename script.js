// Values
const billAmountInput = document.querySelector(".bill-amount");
const peopleNumberInput = document.querySelector(".number-of-people");
const customTipInput = document.querySelector(".custom-tip");
// Elements
const totalOutput = document.querySelector(".total span");
const tipsTilesContainer = document.querySelector(".tip-container");
const tipOutput = document.querySelector(".tip-amount span");
const eachPersonOutput = document.querySelector(".each-person-bill span");
const generateButton = document.querySelector(".generate");
const resetButton = document.querySelector(".reset-btn");
// Variables
let tipPercentage;

// Store initial states
const initialState = {
    generateButtonDisabled: generateButton.disabled,
    generateButtonCursor: generateButton.style.cursor,
    resetButtonDisabled: resetButton.disabled,
    resetButtonCursor: resetButton.style.cursor,
    billAmountInputDisabled: billAmountInput.disabled,
    peopleNumberInputDisabled: peopleNumberInput.disabled,
    customTipInputDisabled: customTipInput.disabled,
    tipsTilesContainerDisabled: tipsTilesContainer.classList.contains('disabled')
};

// Function to reset everything to initial state
function resetToInitialState() {
    billAmountInput.value = "";
    peopleNumberInput.value = "";
    customTipInput.value = "";
    tipOutput.innerText = "";
    totalOutput.innerText = "";
    eachPersonOutput.innerText = "";
    tipPercentage = 0;
    [...tipsTilesContainer.children].forEach((index) => index.classList.remove("selected"));
    
    // Reset elements to initial state
    generateButton.disabled = initialState.generateButtonDisabled;
    generateButton.style.cursor = initialState.generateButtonCursor;
    resetButton.disabled = initialState.resetButtonDisabled;
    resetButton.style.cursor = initialState.resetButtonCursor;
    billAmountInput.disabled = initialState.billAmountInputDisabled;
    peopleNumberInput.disabled = initialState.peopleNumberInputDisabled;
    customTipInput.disabled = initialState.customTipInputDisabled;
    
    if (initialState.tipsTilesContainerDisabled) {
        tipsTilesContainer.classList.add('disabled');
    } else {
        tipsTilesContainer.classList.remove('disabled');
    }
}

generateButton.addEventListener("click", () => {
    let billValue = parseFloat(billAmountInput.value);
    let peopleValue = parseInt(peopleNumberInput.value);
    
    if (isNaN(billValue) || billValue <= 0 || isNaN(peopleValue) || peopleValue <= 0) {
        alert("Please enter valid bill amount and number of people.");
        return;
    }

    const tipAmount = (tipPercentage > 0 ? billValue * (tipPercentage) / 100 : 0);
    const totalBill = (tipAmount + billValue > 0 ? tipAmount + billValue : 0);
    const eachPersonbill = peopleValue > 0 ? totalBill / peopleValue : 0;
    tipOutput.innerText = `₹${tipAmount.toFixed(2)}`;
    totalOutput.innerText = `₹${totalBill.toFixed(2)}`;
    eachPersonOutput.innerText = `₹${eachPersonbill.toFixed(2)}`;
    resetButton.disabled = false;
    // disabling buttons and inputs from left side
    generateButton.style.cursor = "not-allowed";
    customTipInput.disabled = true;
    peopleNumberInput.disabled = true;
    generateButton.disabled = true;
    billAmountInput.disabled = true;
    tipsTilesContainer.classList.add('disabled');
});

// Using event delegation to get the tip value selected by the user
tipsTilesContainer.addEventListener("click", (e) => {
    if(tipsTilesContainer.classList.contains('disabled')) return;
    if (e.target !== tipsTilesContainer && e.target.innerText) {
        // Spreading the children of the container and removing the selected class from all the children
        [...tipsTilesContainer.children].forEach((index) => index.classList.remove("selected"));
        e.target.classList.add("selected");
        tipPercentage = parseInt(e.target.innerText);
        customTipInput.value = "";
    }
});

customTipInput.addEventListener("input", () => {
    // Spreading the children of the container and removing the selected class from all the children
    [...tipsTilesContainer.children].forEach((index) => index.classList.remove("selected"));
    tipPercentage = parseFloat(customTipInput.value);
    if (isNaN(tipPercentage) || tipPercentage < 0) {
        tipPercentage = 0;
    }
});

resetButton.addEventListener("click", resetToInitialState);

billAmountInput.addEventListener("input", () => {
    if (billAmountInput.value && parseFloat(billAmountInput.value) > 0) {
        peopleNumberInput.disabled = false;
        customTipInput.disabled = false;
        generateButton.disabled = false;
        tipsTilesContainer.classList.remove('disabled');
    } else {
        peopleNumberInput.disabled = true;
        customTipInput.disabled = true;
        generateButton.disabled = true;
        tipsTilesContainer.classList.add('disabled');
    }
});

peopleNumberInput.addEventListener("input", () => {
    generateButton.disabled = !(peopleNumberInput.value && parseInt(peopleNumberInput.value) > 0);
});
