// Values
const billAmountInput = document.querySelector(".bill-amount")
const peopleNumberInput = document.querySelector(".number-of-people")
const customTipInput = document.querySelector(".custom-tip")

// Elements
const totalOutput = document.querySelector(".total span")
const tipsTilesContainer = document.querySelector(".tip-container")
const tipOutput = document.querySelector(".tip-amount span")
const eachPersonOutput = document.querySelector(".each-person-bill span")
const generateButton = document.querySelector(".generate")
const resetButton = document.querySelector(".reset-btn")

//Variables
let tipPercentage;

generateButton.addEventListener("click", () => {
    let billValue = parseInt(billAmountInput.value);
    let peopleValue = parseInt(peopleNumberInput.value);

    const tipAmount = (tipPercentage > 0 ? billValue * (tipPercentage) / 100 : 0);
    const totalBill = (tipAmount + billValue > 0 ? tipAmount + billValue : 0);

    const eachPersonbill = peopleValue > 0 ? totalBill / peopleValue : 0;

    tipOutput.innerText = `₹${tipAmount.toFixed(2)}`;
    totalOutput.innerText = `₹${totalBill.toFixed(2)}`;
    eachPersonOutput.innerText = `₹${eachPersonbill.toFixed(2)}`;

    resetButton.disabled=false;

    //disabling buttons and inputs from left side
    generateButton.style.cursor = "not-allowed";
    customTipInput.disabled = true;
    peopleNumberInput.disabled = true;
    generateButton.disabled = true;
    billAmountInput.disabled = true;
    tipsTilesContainer.classList.add('disabled');
});


// Using event deligation to get the tip value selected by the user
tipsTilesContainer.addEventListener("click", (e) => {
    if(tipsTilesContainer.classList.contains('disabled')) return;
    if (e.target !== tipsTilesContainer) {
        //Spreading the children of the container and removing the selected class from all the children
        [...tipsTilesContainer.children].forEach((index) => index.classList.remove("selected"));
        e.target.classList.add("selected");
        tipPercentage = parseInt(e.target.innerText);
        customTipInput.value = "";
    }
});


customTipInput.addEventListener("input", () => {
    //Spreading the children of the container and removing the selected class from all the children
    [...tipsTilesContainer.children].forEach((index) => index.classList.remove("selected"));
    tipPercentage = parseInt(customTipInput.value);
});

resetButton.addEventListener("click", () => {
    billAmountInput.value = "";
    peopleNumberInput.value = "";
    customTipInput.value = "";
    tipOutput.innerText = "";
    totalOutput.innerText = "";
    eachPersonOutput.innerText = "";
    [...tipsTilesContainer.children].forEach((index) => index.classList.remove("selected"));
    resetButton.disabled=true;
    billAmountInput.disabled = false;
    
    //changing the cursor to not allowed
    resetButton.style.cursor = "not-allowed";
});

billAmountInput.addEventListener("input", () => {
    if (billAmountInput.value) {
        peopleNumberInput.disabled = false;
        customTipInput.disabled = false;
        generateButton.disabled = false;
        tipsTilesContainer.classList.remove('disabled');
    } else{
        peopleNumberInput.disabled = true;
        customTipInput.disabled = true;
        generateButton.disabled = true;
        tipsTilesContainer.classList.add('disabled');

    }
});