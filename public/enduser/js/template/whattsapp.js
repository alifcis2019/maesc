// 1-textarea count of chars

const textarea = document.getElementById("message");
const charCount = document.getElementById("charCount");
const maxLength = 300;
textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;
    charCount.textContent = `${currentLength} / 300`;

    // Ensure the user cannot type more than the maximum length
    if (currentLength > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
    }
});

// 2-handle variables and remove it

let add_var = document.getElementById("add-var");
let variables_container = document.getElementById("variables-container");

let variableCounter = 0; // Counter to ensure unique IDs across all variables

add_var.addEventListener("click", () => {
    // Increment the counter to ensure a new unique ID for the variable
    let newId = ++variableCounter;

    let data = `
<div class="form-container" id="var-container-${newId}">
    <div class="form-input">
        <label for="variable-${newId}" class="form-label">Variable-${newId}</label>
        <div class="d-flex align-items-center justify-content-between gap-2">
        <input type="text" id="variable-${newId}" class="form-control variable" value="" placeholder="Enter Variable Data">
        <button type="button" class="delete-var-btn btn btn-danger text-light fs-6 fw-6" onclick="deleteVariable(${newId})">Delete</button>
        </div>
    </div>
</div>
`;

    // Append the new variable without clearing the existing ones
    variables_container.insertAdjacentHTML("beforeend", data);
    attachVariableListeners();
    render_variable(newId);
});

// Ensure every variable has an input event listener attached
function attachVariableListeners() {
    let variables_container = document.querySelectorAll(".variable");
    variables_container.forEach((el) => {
        el.addEventListener("input", render_message); // Call render_message on input change
    });
}

// Function to delete a variable
function deleteVariable(id) {
    let varContainer = document.getElementById(`var-container-${id}`);
    if (varContainer) {
        varContainer.remove(); // Remove the specific variable container
        // Remove the placeholder {{v{id}}} from the message
        let mes = document.getElementById("message").value;
        let updatedMessage = mes.replaceAll(`{{v${id}}}`, ""); // Remove placeholder {{v{id}}}
        document.getElementById("message").value = updatedMessage; // Update the message input value

        render_message();
    }
}

// 3- render message

// handle text render
document.getElementById("message-text").addEventListener("change", () => {
    document.getElementById("text").addEventListener("input", () => {
        document.querySelector(".message-header").innerHTML =
            document.getElementById("text").value;
        document.querySelector(".preveiw-message").classList.remove("d-none");
        document.querySelector(".message-header").classList.remove("d-none");
    });
});

// handle image render
document.getElementById("message-image").addEventListener("change", () => {
    document.getElementById("image").addEventListener("input", () => {
        document.querySelector(".message-header").classList.remove("d-none");
        document.querySelector(".preveiw-message").classList.remove("d-none");
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onload = (e) => {
                // Create an image element and set its source to the loaded file
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100%"; // Limit the image size for display purposes
                img.style.maxHeight = "150px";
                // Clear the previous content and append the new image
                const header = document.querySelector(".message-header");
                header.innerHTML = ""; // Clear existing content
                header.appendChild(img); // Append the new image
            };
            reader.readAsDataURL(file); // Read the file as a data URL (base64)
        }
    });
});

// handle message render
document.getElementById("message").addEventListener("input", () => {
    document.querySelector(".message-body").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    // document.querySelector(".message-body").innerHTML = document.getElementById('message').value
    render_message();
});

// handle footer render
document.getElementById("footer").addEventListener("input", () => {
    document.querySelector(".message-footer").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    document.querySelector(".message-footer").innerHTML =
        document.getElementById("footer").value;
});

document.getElementById("link").addEventListener("input", () => {
    const linkValue = document.getElementById("link").value; // Get the input value
    const messageBtns = document.querySelector(".message-btns"); // Get the container
    document.querySelector(".message-btns").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    const existingLink = messageBtns.querySelector(".message-btns-link");
    if (existingLink) {
        messageBtns.removeChild(existingLink);
    }
    // Create a new link element
    const newLink = document.createElement("a");
    newLink.setAttribute("href", linkValue); // Set the href attribute
    newLink.innerHTML = " Open Website"; // Set the text of the link
    newLink.classList.add("message-btns-link"); // Optional: Add a class for styling
    // Append the new link to the message buttons container
    newLink.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#5f6368"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg>`;
    messageBtns.appendChild(newLink);
});

function render_variable(id) {
    document.getElementById("message").value += `\{\{v${id}\}\}`;
}

function render_message() {
    let variables_container = document.querySelectorAll(".variable");
    let mes = document.getElementById("message").value;
    document.querySelector(".message-body").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    document.querySelector(".message-body").innerHTML = mes;

    // update variables in message
    // update variables in the message
    if (variables_container.length > 0) {
        variables_container.forEach((el, index) => {
            let v_id = el.id.split("-")[1]; // Extract the variable ID from the element's ID
            let valueForV = document.getElementById(`variable-${v_id}`).value; // Get the value for this variable
            mes = mes.replaceAll(`{{v${v_id}}}`, valueForV); // Replace placeholder with variable value
            document.querySelector(".message-body").innerHTML = mes;

            // Re-attach input event listener for real-time updates
            el.addEventListener("input", render_message);
        });
    }

    checkBold();
    checkItalic();
    checkUnderline();
}

function checkBold() {
    var messageBody = document.querySelector(".message-body");
    // Get the original HTML content
    var originalHTML = messageBody.innerHTML;
    var matchesBold = document
        .querySelector(".message-body")
        .innerHTML.match(/"(.*?)"/g);

    if (matchesBold) {
        // Create a new content string based on the original content
        var modifiedHTML = originalHTML;

        // Iterate through each match to replace it with a span-wrapped version
        matchesBold.forEach(function (match) {
            // Create a span element with bold styling
            var spanElement = `<b>` + match.slice(1, -1) + `</b>`;

            modifiedHTML = modifiedHTML.replace(match, function () {
                return spanElement;
            });
        });

        // Update the inner HTML of the element
        messageBody.innerHTML = modifiedHTML;
    }
}

function checkItalic() {
    var messageBody = document.querySelector(".message-body");
    // Get the original HTML content
    var originalHTML = messageBody.innerHTML;
    var matchesItalic = document
        .querySelector(".message-body")
        .innerHTML.match(/-(.*?)-/g);

    if (matchesItalic) {
        // Create a new content string based on the original content
        var modifiedHTML = originalHTML;

        // Iterate through each match to replace it with a span-wrapped version
        matchesItalic.forEach(function (match) {
            // Create a span element with bold styling
            var spanElement = "<i>" + match.slice(1, -1) + "</i>";

            // Replace the match in the modifiedHTML with the span element
            modifiedHTML = modifiedHTML.replace(match, spanElement);
        });

        // Update the inner HTML of the element
        messageBody.innerHTML = modifiedHTML;
    }
}

function checkUnderline() {
    var messageBody = document.querySelector(".message-body");
    // Get the original HTML content
    var originalHTML = messageBody.innerHTML;
    var matchesUnderline = document
        .querySelector(".message-body")
        .innerHTML.match(/_(.*?)_/g);

    if (matchesUnderline) {
        // Create a new content string based on the original content
        var modifiedHTML = originalHTML;

        // Iterate through each match to replace it with a span-wrapped version
        matchesUnderline.forEach(function (match) {
            // Create a span element with bold styling
            var spanElement =
                '<span style="text-decoration:underline">' +
                match.slice(1, -1) +
                "</span>";

            // Replace the match in the modifiedHTML with the span element
            modifiedHTML = modifiedHTML.replace(match, spanElement);
        });

        // Update the inner HTML of the element
        messageBody.innerHTML = modifiedHTML;
    }
}

function getSelectedText() {
    const messageInput = document.getElementById("message");
    return messageInput.value.substring(
        messageInput.selectionStart,
        messageInput.selectionEnd
    );
}

// Function to apply formatting around selected text
function applyFormatting(startTag, endTag) {
    const messageInput = document.getElementById("message");
    const selectedText = getSelectedText();

    if (selectedText) {
        const beforeText = messageInput.value.substring(
            0,
            messageInput.selectionStart
        );
        const afterText = messageInput.value.substring(
            messageInput.selectionEnd
        );
        messageInput.value =
            beforeText + startTag + selectedText + endTag + afterText;
    } else {
        // If no text is selected, apply the formatting with placeholders
        render_message();
    }

    render_message(); // Assuming this function renders the message preview
}

document.getElementById("boldBtn").addEventListener("click", () => {
    applyFormatting('"', '"'); // Bold format
});

document.getElementById("italicBtn").addEventListener("click", () => {
    applyFormatting("-", "-"); // Italic format
});

document.getElementById("underlineBtn").addEventListener("click", () => {
    applyFormatting("_", "_"); // Underline format
});

document.getElementById("whats-tab").addEventListener("click", () => {
    if (document.getElementById("whats-tab").classList.contains("active")) {
        render_message();
    }
});

document.getElementById("sms-tab").addEventListener("click", () => {
    if (document.getElementById("sms-tab").classList.contains("active")) {
        document.getElementById('template_type').value = 'sms';
        reset_preview();
        render_sms();
    }
});

function reset_preview() {
    // document.querySelector(".preveiw-message").classList.add("d-none");
    // document.querySelector(".message-header").innerHTML = ""
    document.querySelector(".message-header").classList.add("d-none");
    render_sms;
    document.querySelector(".message-footer").innerHTML = "";
    document.querySelector(".message-footer").classList.add("d-none");
    document.querySelector(".message-btns").innerHTML = "";
    document.querySelector(".message-btns").classList.add("d-none");
}




document.getElementById("sms-message").addEventListener("input", () => {

    document.querySelector(".message-body").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    render_sms();
});




// handle sms message
function render_sms() {
    let variables_container = document.querySelectorAll(
        ".sms-variable"
    );
    let mes = document.getElementById("sms-message").value;
    mes = mes.replace(/\n/g, '<br>');
    document.querySelector(".message-body").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    document.querySelector(".message-body").innerHTML = mes;


    // update variables in message
    // update variables in the message
    if (variables_container.length > 0) {
        variables_container.forEach((el, index) => {
            let v_id = el.id.split("-")[2]; // Extract the variable ID from the element's ID
            console.log(v_id);

            let valueForV = document.getElementById(`sms-variable-${v_id}`).value; // Get the value for this variable
            mes = mes.replaceAll(`{{v${v_id}}}`, valueForV); // Replace placeholder with variable value
            document.querySelector(".message-body").innerHTML = mes;

            // Re-attach input event listener for real-time updates
            el.addEventListener("input", render_sms);
        });
    }
}


window.addEventListener('DOMContentLoaded',()=>{
    render_message();
})




let add_smsvar = document.getElementById("add-var-sms");
let sms_variables_container = document.getElementById("sms-variables-container");

let sms_variableCounter = 0; // Counter to ensure unique IDs across all variables

add_smsvar.addEventListener("click", () => {
    // Increment the counter to ensure a new unique ID for the variable
    let newId = ++sms_variableCounter;

    let data = `
<div class="form-container" id="sms-var-container-${newId}">
    <div class="form-input">
        <label for="sms-variable-${newId}" class="form-label">Variable-${newId}</label>
        <div class="d-flex align-items-center justify-content-between gap-2">
        <input type="text" id="sms-variable-${newId}" class="form-control sms-variable" value="" placeholder="Enter Variable Data">
        <button type="button" class="sms-delete-var-btn btn btn-danger text-light fs-6 fw-6" onclick="sms_deleteVariable(${newId})">Delete</button>
        </div>
    </div>
</div>
`;

    // Append the new variable without clearing the existing ones
    sms_variables_container.insertAdjacentHTML("beforeend", data);
    sms_attachVariableListeners();
    sms_render_variable(newId);
});

// Ensure every variable has an input event listener attached
function sms_attachVariableListeners() {
    let variables_container = document.querySelectorAll(".sms-variable");
    variables_container.forEach((el) => {
        el.addEventListener("input", render_sms); // Call render_message on input change
    });
}

// Function to delete a variable
function sms_deleteVariable(id) {
    let varContainer = document.getElementById(`sms-var-container-${id}`);
    if (varContainer) {
        varContainer.remove(); // Remove the specific variable container
        // Remove the placeholder {{v{id}}} from the message
        let mes = document.getElementById("sms-message").value;
        let updatedMessage = mes.replaceAll(`{{v${id}}}`, ""); // Remove placeholder {{v{id}}}
        document.getElementById("sms-message").value = updatedMessage; // Update the message input value

        render_sms();
    }
}


function sms_render_variable(id) {
    document.getElementById("sms-message").value += `\{\{v${id}\}\}`;
}

// for sms textarea count chars

const sms_textarea = document.getElementById("sms-message");
const sms_charCount = document.getElementById("sms-charCount");
const sms_maxLength = 299;
sms_textarea.addEventListener("input", () => {
    const currentLength = sms_textarea.value.length;
    sms_charCount.textContent = `${currentLength} / 300`;

    // Ensure the user cannot type more than the maximum length
    if (currentLength > sms_maxLength) {
        sms_textarea.value = sms_textarea.value.substring(0, sms_maxLength);
    }
});
