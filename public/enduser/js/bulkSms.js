
    document.addEventListener("DOMContentLoaded", () => {
    const dataInput = document.getElementById("dataInput");
    const dataList = document.getElementById("dataList");
    const addData = (data) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "data-item";
    const itemText = document.createElement("span");
    itemText.textContent = data;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => {
    dataList.removeChild(itemDiv);
});
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(deleteButton);
    dataList.appendChild(itemDiv);
};
    dataInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && dataInput.value.trim() !== "") {
    addData(dataInput.value.trim());
    dataInput.value = "";
}
});
});


    // Array to store the numbers
    const numbers = [];
    let converted_num = document.querySelector('#converted-numbers')
    console.log(converted_num);

    // Log the current numbers to the console
    function logNumbers() {
    converted_num.value = numbers;
    const jsonString = JSON.stringify(numbers);
    const hiddenInput = document.getElementById("converted-numbers");
    hiddenInput.value = jsonString;

    // Trigger an input event to notify Livewire of the change
    hiddenInput.dispatchEvent(new Event('input'));

}

    // Add a new number as a tag
    function addTag(number) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = number;

    // Add click event to remove the tag
    tag.addEventListener('click', function() {
    // Remove the number from the array
    const index = numbers.indexOf(number);
    if (index > -1) numbers.splice(index, 1);

    // Remove the tag element
    tagInputContainer.removeChild(tag);

    // Log the updated numbers
    logNumbers();
});

    // Insert the tag before the input field
    tagInputContainer.insertBefore(tag, tagInput);

    // Add the number to the array
    numbers.push(number);

    // Log the updated numbers
    logNumbers();
}

    // DOM elements
    const tagInput = document.getElementById('tagInput');
    const tagInputContainer = document.getElementById('tagInputContainer');

    // Handle Enter key for adding a single number
    tagInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default form submission or behavior
    const value = tagInput.value.trim();
    if (value && !isNaN(value)) {
    addTag(value);
    tagInput.value = '';
}
}
});

    // Handle pasting multiple numbers
    tagInput.addEventListener('paste', function(e) {
    e.preventDefault(); // Prevent default paste behavior

    // Get pasted data
    const pasteData = e.clipboardData.getData('text');

    // Split the pasted content by newlines and process each number
    const pastedNumbers = pasteData.split(/\r?\n/).map(num => num.trim()).filter(num => num && !isNaN(num));

    // Create tags for each valid number
    pastedNumbers.forEach(addTag);

    // Clear the input field
    tagInput.value = '';
});
