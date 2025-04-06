const textArea = document.querySelector(".text_filled")
const charCount =document.querySelector(".total_words")

textArea.addEventListener("input", () => {
    charCount.textContent = `${textArea.value.length} / 250`;

    if (textArea.value.length >= 250) {
        textArea.classList.add("limit");
        charCount.classList.add("countUp");
    } else {
        textArea.classList.remove("limit");
        charCount.classList.remove("countUp");
    }
});
