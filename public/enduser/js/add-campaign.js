const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const errorDisplay = document.getElementById('errorDisplay');

fileInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();

        // Check if the file is an Excel sheet
        if (fileExtension === 'xls' || fileExtension === 'xlsx') {
            fileNameDisplay.textContent = fileName; // Display the file name
            errorDisplay.textContent = ''; // Clear any previous error message
        } else {
            // Show error message if the file type is invalid
            fileInput.value = ''; // Clear the input
            fileNameDisplay.textContent = 'No file selected'; // Reset display
            errorDisplay.textContent = 'Please upload a valid Excel file (.xls or .xlsx).';
        }
    } else {
        // Reset display if no file is selected
        fileNameDisplay.textContent = 'No file selected';
        errorDisplay.textContent = ''; // Clear any previous error message
    }
});
