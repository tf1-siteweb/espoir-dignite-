// =========================================
// MENU MOBILE
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


// Fermer le menu après avoir cliqué sur un lien

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


// =========================================
// BOUTONS DE DON
// =========================================

const amounts = document.querySelectorAll(".amount");

amounts.forEach(button => {

    button.addEventListener("click", () => {

        amounts.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

    });

});


// =========================================
// FORMULAIRE
// =========================================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    alert(
        "Merci pour votre message. Le formulaire devra être connecté à une adresse e-mail ou à un service backend avant la mise en ligne."
    );

});
