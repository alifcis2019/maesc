window.addEventListener("load", () => {
    setTimeout(() => {
        var bar = new ProgressBar.Circle("#progress-circle", {
            color: "#fffff", // Custom color
            strokeWidth: 10,
            trailWidth: 12,
            trailColor: "#ddd",
            easing: "easeInOut",
            duration: 2000, // Animation duration in ms
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: "#1200f1",
                width: "16",
            },
            to: {
                color: "#1494D1",
                width: "16",
            },
            step: function (state, circle) {
                circle.path.setAttribute("stroke", state.color);
                circle.path.setAttribute("stroke-width", "12");
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText("");
                } else {
                    circle.setText(value + "%");
                }
            },
            reverse: true,
        });
        bar.text.style.fontSize = "2rem";
        bar.animate(document.getElementById("value").innerHTML / 100); // Set progress to 75%
    }, 2000);
});
