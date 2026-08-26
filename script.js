/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const isOpen =
            navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    document
        .querySelectorAll("#navMenu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =========================================
   BOUTONS DE DON
========================================= */

const amounts =
    document.querySelectorAll(".amount");


amounts.forEach(button => {

    button.addEventListener("click", () => {

        amounts.forEach(item => {

            item.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});


/* =========================================
   FORMULAIRE
========================================= */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            alert(
                "Merci pour votre message. Le formulaire sera connecté à notre système de contact."
            );

        }
    );

}


/* =========================================
   HEADER AU SCROLL
========================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 10px 30px rgba(24,35,31,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});
