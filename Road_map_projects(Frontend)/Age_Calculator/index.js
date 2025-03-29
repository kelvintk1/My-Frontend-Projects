import { DateTime } from "./node_modules/luxon/build/es6/luxon.js";

document.querySelector(".calc_button").addEventListener("click", () => {
    let birthdateElement = document.querySelector(".birthDate"); // Select input
    let birthdateValue = birthdateElement.value; // Get input value

    if (!birthdateValue) {
        document.querySelector(".output").innerHTML = "<h3>Please enter a valid birthdate.</h3>";
        return;
    }

    let birthDate = DateTime.fromISO(birthdateValue); // Convert input to DateTime
    let currentDate = DateTime.now(); // Get current date
    let ageDiff = currentDate.diff(birthDate, ["years", "months"]); // Get difference

    let years = ageDiff.years;
    let months = ageDiff.months;

    document.querySelector(".output").innerHTML = `<h3>You are ${Math.floor(years)} years and ${Math.floor(months)} months old.</h3>`;
});
