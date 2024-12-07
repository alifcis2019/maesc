const togglerBtn = document.querySelector(".sidebar-toggler");
const navbar = document.querySelector(".navbar");
const beon_container = document.querySelector(".beon-container");
const aside = document.querySelector(".aside");
const mobile_toggleBtn = document.querySelector(".btn-toggler");
if (togglerBtn) {
    togglerBtn.addEventListener("click", () => {
        aside.classList.toggle("hide");
        togglerBtn.classList.toggle("hide");
        navbar.classList.toggle("hide");
        beon_container.classList.toggle("hide");
        if (localStorage.getItem("sidebar-stretch")) {
            localStorage.setItem(
                "sidebar-stretch",
                !(localStorage.getItem("sidebar-stretch") === "true")
            );
        } else {
            localStorage.setItem("sidebar-stretch", true);
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    if (
        localStorage.getItem("sidebar-stretch") &&
        localStorage.getItem("sidebar-stretch") == "true" && window.innerWidth > 991
    ) {
        aside.classList.toggle("hide");
        togglerBtn.classList.toggle("hide");
        navbar.classList.toggle("hide");
        beon_container.classList.toggle("hide");
    }
});

if (mobile_toggleBtn) {
    mobile_toggleBtn.addEventListener("click", () => {
        aside.classList.toggle("mobile-view");
        console.log("ali");
    });
}
