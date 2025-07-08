const numberInput = document.getElementsByClassName("temp-input")[0];
const unitSelectFrom = document.getElementsByClassName("unit-select-from")[0];
const unitSelectTo = document.getElementsByClassName("unit-select-to")[0];
const resultDiv = document.getElementsByClassName("result-text")[0];
const form = document.getElementsByClassName("temp-form")[0];

function convertTemperature(event) {
    event.preventDefault(); // Prevent form submission

    const inputValue = parseFloat(numberInput.value);
    const fromUnit = unitSelectFrom.value.toLowerCase();
    const toUnit = unitSelectTo.value.toLowerCase();

    if (isNaN(inputValue)) {
        alert("Please enter a valid number.");
        return;
    }

    let convertedValue;

    if (fromUnit === "celsius") {
        if (toUnit === "fahrenheit") {
            convertedValue = (inputValue * 9/5) + 32;
        } else if (toUnit === "kelvin") {
            convertedValue = inputValue + 273.15;
        } else {
            convertedValue = inputValue; // Celsius to Celsius
        }
    } else if (fromUnit === "fahrenheit") {
        if (toUnit === "celsius") {
            convertedValue = (inputValue - 32) * 5/9;
        } else if (toUnit === "kelvin") {
            convertedValue = ((inputValue - 32) * 5/9) + 273.15;
        } else {
            convertedValue = inputValue; // Fahrenheit to Fahrenheit
        }
    } else if (fromUnit === "kelvin") {
        if (toUnit === "celsius") {
            convertedValue = inputValue - 273.15;
        } else if (toUnit === "fahrenheit") {
            convertedValue = ((inputValue - 273.15) * 9/5) + 32;
        } else {
            convertedValue = inputValue; // Kelvin to Kelvin
        }
    } else {
        resultDiv.innerHTML = "Please select valid units.";
        resultDiv.style.display = "block";
        return;
    }

    // Format units with first letter uppercase
    const fromUnitFormatted = fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1);
    const toUnitFormatted = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);

    resultDiv.innerHTML = `${inputValue} ${fromUnitFormatted} is ${convertedValue.toFixed(2)} ${toUnitFormatted}`;
    resultDiv.style.display = "block";
}

// Attach event listener to the form
form.onsubmit = convertTemperature;

