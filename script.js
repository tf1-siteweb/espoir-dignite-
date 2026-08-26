/* =========================================
   ESPOIR & DIGNITÉ
   INTERACTIONS DU SITE
========================================= */


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    document.querySelectorAll("#navMenu a").forEach(link => {

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
   APPARITION DES SECTIONS
========================================= */

const revealElements =
    document.querySelectorAll(".scroll-reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   COMPTEURS ANIMÉS
========================================= */

const counters =
    document.querySelectorAll("[data-counter]");


const animateCounter = (element) => {

    const target =
        Number(element.dataset.counter);

    const suffix =
        element.dataset.suffix || "";

    const duration = 1800;

    const startTime = performance.now();


    const updateCounter = (currentTime) => {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        /* effet de ralentissement naturel */

        const ease =
            1 - Math.pow(1 - progress, 3);


        const current =
            Math.floor(target * ease);


        element.textContent =
            current.toLocaleString("fr-FR") + suffix;


        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            element.textContent =
                target.toLocaleString("fr-FR") + suffix;

        }

    };


    requestAnimationFrame(updateCounter);

};


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.6
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   BARRES DE BUDGET
========================================= */

const budgetBars =
    document.querySelectorAll("[data-progress]");


const budgetObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const percentage =
                        entry.target.dataset.progress;

                    entry.target.style.width =
                        percentage + "%";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.3
        }
    );


budgetBars.forEach(bar => {

    bar.style.width = "0%";

    budgetObserver.observe(bar);

});


/* =========================================
   CARTES — EFFET LÉGER
========================================= */

const cards =
    document.querySelectorAll(
        ".project-card, .impact-card, .value-card"
    );


cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const rotateY =
            ((x / rect.width) - 0.5) * 3;

        const rotateX =
            ((y / rect.height) - 0.5) * -3;


        card.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   HEADER AU DÉFILEMENT
========================================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    },
    {
        passive: true
    }
);


/* =========================================
   BOUTON RETOUR EN HAUT
========================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        },
        {
            passive: true
        }
    );


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   LIENS INTERNES FLUIDES
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");


        if (
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }


        event.preventDefault();


        const target =
            document.querySelector(targetId);


        const headerHeight =
            header ? header.offsetHeight : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================
   BOUTONS DE DON
========================================= */

const donationAmounts =
    document.querySelectorAll(".amount");


donationAmounts.forEach(button => {

    button.addEventListener("click", () => {

        donationAmounts.forEach(item => {

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
        event => {

            event.preventDefault();

            alert(
                "Merci pour votre message. " +
                "Le formulaire sera connecté à notre système de contact."
            );

        }
    );

}


/* =========================================
   ANIMATION DU LOGO
========================================= */

const logo =
    document.querySelector(".logo");


if (logo) {

    logo.addEventListener("mouseenter", () => {

        logo.classList.add("logo-active");

    });


    logo.addEventListener("mouseleave", () => {

        logo.classList.remove("logo-active");

    });

}


/* =========================================
   ANNÉE AUTOMATIQUE
========================================= */

document.querySelectorAll("[data-current-year]")
    .forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });
