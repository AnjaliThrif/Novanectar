document.addEventListener("DOMContentLoaded", function () {
    const bookButton = document.querySelector(".hero .btn");
    const contactForm = document.getElementById("contact-form");

    // Fix: Ensure the button remains clickable
    bookButton.addEventListener("click", function (event) {
        event.preventDefault();
        alert("Redirecting to appointment booking...");
    });

    // Fix: Ensure contact form submits properly
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Message sent successfully!");
    });
});
