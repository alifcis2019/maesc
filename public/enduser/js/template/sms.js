const sms_textarea = document.getElementById("sms-message");
const sms_charCount = document.getElementById("sms-charCount");
const sms_maxLength = 300;
sms_textarea.addEventListener("input", () => {
    const currentLength = sms_textarea.value.length;
    sms_charCount.textContent = `${currentLength} / 300`;

    // Ensure the user cannot type more than the maximum length
    if (currentLength > maxLength) {
        sms_textarea.value = sms_textarea.value.substring(0, sms_maxLength);
    }
});

let add_var_sms = document.getElementById("add-var-sms");
let variables_container_sms = document.getElementById(
    "sms-variables-container"
);

add_var_sms.addEventListener("click", () => {
    let vars = document.querySelectorAll(".sms-variable");
    let var_length = vars.length;
    let sms_newId = ++var_length;

    let data = `
    <div class="form-container" id="sms-var-container-${sms_newId}">
        <div class="form-input ">
            <label for="variable-${sms_newId}" class="form-label">Variable-${sms_newId}</label>
            <div class="d-flex align-items-center justify-content-between gap-2">
            <input type="text" id="sms-variable-${sms_newId}" class="form-control sms-variable" value="" placeholder="Enter Variable Data" oninput="console.log('ali')">
            <button type="button" class="delete-var-btn btn btn-danger text-light fs-6 fw-6" onclick="sms_deleteVariable(${sms_newId})">Delete</button>
            </div>
        </div>
    </div>
    `;

    // Append the new variable without clearing the existing ones
    variables_container_sms.insertAdjacentHTML("beforeend", data);
    render_variable(sms_newId);
});

// Function to delete variable
function sms_deleteVariable(id) {
    let varContainer = document.getElementById(`sms-var-container-${id}`);
    if (varContainer) {
        varContainer.remove(); // Remove the specific variable container
    }
}


sms_textarea.addEventListener("keydown", (e) => {
    console.log(e); // Log the key pressed

    if (e.key === "Enter") { // Check for the correct case
        e.preventDefault(); // Prevent the default behavior (new line in textarea)
        sms_textarea.value += "\n"; // Manually add a new line character
        render_message(); // Render the message with line breaks
    }
});


// handle message render
document.getElementById("sms-message").addEventListener("input", () => {
    document.querySelector(".message-body").classList.remove("d-none");
    document.querySelector(".preveiw-message").classList.remove("d-none");
    document.querySelector(".message-header").classList.add("d-none");
    document.querySelector(".message-footer").classList.add("d-none");
    document.querySelector(".message-btns").classList.add("d-none");
    console.log(e);
    render_message();
});



function render_variable(id) {
    document.getElementById("sms-message").value += `\{\{v${id}\}\}`;
}

function render_message() {
    let variables_container_sms = document.querySelectorAll(".sms-variable");
    let mes = document.getElementById("sms-message").value;

    // Replace line breaks with <br> for rendering in HTML
    mes = mes.replace(/\n/g, "<br>");

    document.querySelector(".message-body").classList.remove("d-none");
    document.querySelector(".preview-message").classList.remove("d-none");
    document.querySelector(".message-body").innerHTML = mes;

    // Update variables in message
    if (variables_container_sms.length > 0) {
        variables_container_sms.forEach((el, index) => {
            let v_id = ++index;
            let valueForV1 = document.getElementById(
                `sms-variable-${v_id}`
            ).value; // Get the value for v1
            const variableElement = document.getElementById(
                `sms-variable-${v_id}`
            );
            console.log(variableElement);
            mes = mes.replaceAll(
                `\{\{v${el.getAttribute("id").slice(-1)}\}\}`,
                valueForV1
            );
            document.querySelector(".message-body").innerHTML = mes;
            variableElement.addEventListener("input", render_message);
        });
    }
}
