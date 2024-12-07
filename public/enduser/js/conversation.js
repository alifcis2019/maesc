document.addEventListener("DOMContentLoaded", function () {
    let add_var = document.getElementById("add-var");
    let variables_container = document.getElementById("variables-container");
    console.log(add_var);

    let variableCounter = 0; // Counter to ensure unique IDs across all variables

    add_var.addEventListener("click", () => {
        // Increment the counter to ensure a new unique ID for the variable
        let newId = ++variableCounter;

        let data = `
<div class="form-container" id="var-container-${newId}">
<div class="form-input">
    <label for="variable-${newId}" class="form-label">Variable-${newId}</label>
    <div class="d-flex align-items-center justify-content-between gap-2">
    <input type="text" id="variable-${newId}" class="form-control variable my-2" value="" placeholder="Enter Variable Data">
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
            let mes = document.getElementById("message").value;
            let updatedMessage = mes.replaceAll(`{{v${id}}}`, ""); // Remove placeholder {{v{id}}}
            document.getElementById("message").value = updatedMessage; // Update the message input value
        }
    }

    function render_variable(id) {
        document.getElementById("conv-message").value += `\{\{v${id}\}\}`;
    }

    function render_message() {
        let variables_container = document.querySelectorAll(".variable");
        let mes = document.getElementById("conv-message").value;

        if (variables_container.length > 0) {
            variables_container.forEach((el, index) => {
                let v_id = el.id.split("-")[1]; // Extract the variable ID from the element's ID
                let valueForV = document.getElementById(
                    `variable-${v_id}`
                ).value; // Get the value for this variable
                mes = mes.replaceAll(`{{v${v_id}}}`, valueForV); // Replace placeholder with variable value
                // document.querySelector(".message-body").innerHTML = mes;

                // Re-attach input event listener for real-time updates
                el.addEventListener("input", render_message);
            });
        }
    }

    document.querySelectorAll("#myMessages .nav-link").forEach((element) => {
        element.addEventListener("click", () => {
            if (window.matchMedia("(max-width: 991px)").matches) {
                document.querySelector(".conversation-message").style.display =
                    "block";
                document.querySelector(".conversation-users").style.display =
                    "none";
                document.querySelector(".return-users").style.display = "block";
            } else {
                console.log("clicked on desktop view");
            }
        });
    });

    document.querySelector(".return-users").addEventListener("click", () => {
        document.querySelector(".conversation-message").style.display = "none";
        document.querySelector(".conversation-users").style.display = "block";
        document.querySelector(".return-users").style.display = "none";
    });
});

function deleteVariable(id) {
    let varContainer = document.getElementById(`var-container-${id}`);
    if (varContainer) {
        varContainer.remove(); // Remove the specific variable container
        // Remove the placeholder {{v{id}}} from the message
        let mes = document.getElementById("conv-message").value;
        let updatedMessage = mes.replaceAll(`{{v${id}}}`, ""); // Remove placeholder {{v{id}}}
        document.getElementById("conv-message").value = updatedMessage; // Update the message input value

        render_message();
    }
}
