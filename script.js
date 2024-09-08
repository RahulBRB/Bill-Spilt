// Values
const billAmountInput = document.querySelector(".bill-amount")
const peopleNumberInput = document.querySelector(".number-of-people")
const customTipInput = document.querySelector(".custom-tip")

// Elements
const totalOutput = document.querySelector(".total span")
const tipOutput = document.querySelector(".tip-amount span")
const eachPersonOutput = document.querySelector(".each-person-bill span")
const generateButton = document.querySelector(".generate")

generateButton.addEventListener("click", () => {
    let billValue = parseInt(billAmountInput.value);
    let customTipValue = parseInt(customTipInput.value);
    let peopleValue = parseInt(peopleNumberInput.value);

    const tipAmount = (customTipValue>0 ? billValue * customTipValue / 100 : 0);
    const totalBill = (tipAmount+billValue > 0 ? tipAmount+billValue : 0);
    
    const eachPersonbill = peopleValue>0? totalBill / peopleValue : 0;

    tipOutput.innerText =  `₹${tipAmount.toFixed(2)}`;
    totalOutput.innerText = `₹${totalBill.toFixed(2)}`;
    eachPersonOutput.innerText = `₹${eachPersonbill.toFixed(2)}`;
});