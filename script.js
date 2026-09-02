```javascript
/* =========================================================
   ESPOIR & DIGNITÉ
   SCRIPT PRINCIPAL — PARTIE 1/2
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       VARIABLES
    ===================================================== */

    const body = document.body;
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
    const backToTop = document.getElementById("backToTop");

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            body.classList.toggle("menu-open", isOpen);

        });

    }


    /* =====================================================
       FERMER LE MENU APRÈS UN CLIC
    ===================================================== */

    if (navMenu) {

        const menuLinks = navMenu.querySelectorAll("a");

        menuLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                if (menuToggle) {
                    menuToggle.classList.remove("active");
                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       DÉFILEMENT FLUIDE
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       BOUTON RETOUR EN HAUT
    ===================================================== */

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

        };

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ANIMATIONS AU DÉFILEMENT
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .scroll-reveal"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       COMPTEURS
       50 VEUVES / 75 ENFANTS / 6 MOIS
    ===================================================== */

    const counters = document.querySelectorAll(
        "[data-counter]"
    );


    const animateCounter = element => {

        const target = Number(
            element.getAttribute("data-counter")
        );

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1600;

        const startTime = performance.now();


        const updateCounter = currentTime => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );


            /* Courbe douce */
            const easedProgress =
                1 - Math.pow(1 - progress, 3);


            const currentValue = Math.floor(
                target * easedProgress
            );


            element.textContent = currentValue.toLocaleString(
                "fr-FR"
            );


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent =
                    target.toLocaleString("fr-FR");

            }

        };


        requestAnimationFrame(updateCounter);

    };


    /* =====================================================
       OBSERVATEUR DES COMPTEURS
    ===================================================== */

    if ("IntersectionObserver" in window && counters.length) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(counter => {

            animateCounter(counter);

        });

    }


    /* =====================================================
       BARRES DE PROGRESSION DU BUDGET
    ===================================================== */

    const progressBars = document.querySelectorAll(
        "[data-progress]"
    );


    const animateProgressBar = bar => {

        const progress = Number(
            bar.getAttribute("data-progress")
        );


        if (!Number.isFinite(progress)) {
            return;
        }


        const safeProgress = Math.max(
            0,
            Math.min(progress, 100)
        );


        /* On part de 0 */
        bar.style.width = "0%";


        /* Petit délai pour permettre
           l'animation CSS */
        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                bar.style.width =
                    `${safeProgress}%`;

            });

        });

    };


    /* =====================================================
       OBSERVATEUR DES BARRES
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        progressBars.length
    ) {

        const progressObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateProgressBar(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.2
                }
            );


        progressBars.forEach(bar => {

            progressObserver.observe(bar);

        });

    } else {

        progressBars.forEach(bar => {

            animateProgressBar(bar);

        });

    }


    /* =====================================================
       BOUTONS DE DON
    ===================================================== */

    const amountButtons =
        document.querySelectorAll(".amount");


    amountButtons.forEach(button => {

        button.addEventListener("click", () => {

            amountButtons.forEach(item => {

                item.classList.remove("selected");

            });


            button.classList.add("selected");


            amountButtons.forEach(item => {

                item.setAttribute(
                    "aria-pressed",
                    item === button
                        ? "true"
                        : "false"
                );

            });

        });

    });


    /* =====================================================
       FORMULAIRE DE CONTACT
       VERSION STATIQUE — AUCUN BACKEND
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    alert(
                        "Veuillez remplir tous les champs avant d'envoyer votre message."
                    );

                    return;

                }


                /* Vérification simple de l'e-mail */
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Veuillez saisir une adresse e-mail valide."
                    );

                    return;

                }


                /*
                 * Le site est actuellement statique.
                 * Aucun message n'est envoyé automatiquement.
                 *
                 * On prépare ici le comportement propre
                 * jusqu'à la mise en place éventuelle
                 * d'un véritable service d'envoi.
                 */

                alert(
                    "Merci pour votre message, " +
                    name +
                    ". Votre demande a bien été prise en compte."
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       FIN PARTIE 1
       ===================================================== */

});
```
/* =========================================================
   ESPOIR & DIGNITÉ
   SCRIPT PRINCIPAL — PARTIE 2/2
   SYSTÈME MULTILINGUE FR / FI / EN
   ========================================================= */


/*
 * IMPORTANT
 * ---------------------------------------------------------
 * Cette partie complète la PARTIE 1/2.
 * Ne pas supprimer la PARTIE 1.
 */


/* =========================================================
   SYSTÈME MULTILINGUE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       CONFIGURATION DES LANGUES
    ===================================================== */

    const supportedLanguages = ["fr", "fi", "en"];

    const defaultLanguage = "fr";

    let currentLanguage =
        localStorage.getItem("espoirDigniteLanguage") ||
        defaultLanguage;


    if (!supportedLanguages.includes(currentLanguage)) {
        currentLanguage = defaultLanguage;
    }


    /* =====================================================
       TRADUCTIONS
    ===================================================== */

    const translations = {

        fr: {

            "nav.home": "Accueil",
            "nav.mission": "Notre mission",
            "nav.actions": "Nos actions",
            "nav.impact": "Notre impact",
            "nav.director": "La directrice",
            "nav.transparency": "Transparence",
            "nav.donate": "Faire un don",

            "hero.tag": "AGIR • PROTÉGER • AUTONOMISER",
            "hero.title": "Redonner de l'espoir,",
            "hero.titleHighlight": "reconstruire des vies.",
            "hero.description": "Nous accompagnons les veuves et les enfants vulnérables en leur offrant une aide concrète, l'accès à l'éducation et les moyens de construire un avenir plus stable.",
            "hero.support": "Soutenir notre mission",
            "hero.mission": "Découvrir notre mission",
            "hero.trustTitle": "Une action fondée sur la dignité",
            "hero.trustText": "Protéger aujourd'hui. Construire demain.",
            "hero.campaign": "NOTRE PREMIÈRE CAMPAGNE",
            "hero.project": "Projet pilote",
            "hero.budget": "Budget prévisionnel",
            "hero.widows": "Veuves",
            "hero.children": "Enfants",
            "hero.months": "Mois",
            "hero.discover": "Découvrir le projet",
            "hero.scroll": "Découvrir",

            "stats.widows": "veuves accompagnées",
            "stats.children": "enfants vulnérables",
            "stats.program": "mois de programme",
            "stats.budget": "budget prévisionnel",

            "mission.label": "NOTRE MISSION",
            "mission.title": "Parce qu'une perte ne devrait pas condamner une famille.",
            "mission.p1": "Dans de nombreuses communautés défavorisées, la perte d'un conjoint ou d'un parent peut faire basculer toute une famille dans la précarité.",
            "mission.p2": "Espoir & Dignité agit auprès des veuves et des enfants vulnérables afin de répondre aux besoins essentiels tout en construisant des solutions durables.",
            "mission.p3": "Notre approche repose sur quatre principes :",
            "mission.principles": "protéger, accompagner, autonomiser et rendre compte.",

            "actions.label": "NOS ACTIONS",
            "actions.title": "Une aide concrète, pensée pour durer.",
            "actions.description": "Notre programme associe assistance immédiate et accompagnement vers l'autonomie.",

            "actions.food.title": "Aide alimentaire",
            "actions.food.text": "Distribution de paniers alimentaires aux familles identifiées comme particulièrement vulnérables.",

            "actions.education.title": "Éducation",
            "actions.education.text": "Fournitures scolaires et soutien à la scolarisation des enfants orphelins et vulnérables.",

            "actions.empowerment.title": "Autonomisation",
            "actions.empowerment.text": "Formation et soutien au lancement de petites activités génératrices de revenus pour les veuves.",

            "actions.protection.title": "Protection des enfants",
            "actions.protection.text": "Identification des situations vulnérables et orientation vers les structures compétentes.",

            "actions.support": "Soutenir cette action →",

            "project.label": "NOTRE PROJET PILOTE",
            "project.title": "Espoir pour les Veuves et les Orphelins",
            "project.description": "Notre première campagne vise à accompagner des familles vulnérables pendant une période initiale de six mois.",
            "project.widows": "veuves ciblées",
            "project.children": "enfants accompagnés",
            "project.duration": "durée initiale",
            "project.budgetButton": "Voir le budget",
            "project.objective": "OBJECTIF DU PROJET",
            "project.budgetDescription": "Budget prévisionnel de la première phase du programme.",
            "project.pilot": "Projet pilote — chiffres prévisionnels",

            "director.label": "NOTRE DIRECTION",
            "director.title": "Ophelie Rollet",
            "director.subtitle": "Une conviction : chaque vie mérite une chance.",
            "director.p1": "À l'origine d'Espoir & Dignité, Ophelie Rollet porte une vision fondée sur la solidarité, la dignité et l'accompagnement des familles les plus vulnérables.",
            "director.p2": "Depuis ses premières expériences dans l'aide aux personnes en difficulté, elle souhaite contribuer concrètement à améliorer les conditions de vie des veuves et des enfants privés de soutien familial.",
            "director.quote": "« Aider une famille aujourd'hui, c'est lui donner une chance de construire son avenir demain. »",
            "director.role": "Directrice",

            "impact.label": "NOTRE IMPACT",
            "impact.title": "Transformer l'aide en possibilités.",
            "impact.description": "Chaque action est suivie afin de mesurer les résultats et d'améliorer progressivement notre programme.",
            "impact.widows": "veuves accompagnées",
            "impact.children": "enfants soutenus",
            "impact.expenses": "des dépenses suivies",
            "impact.followup": "de suivi initial",

            "transparency.label": "TRANSPARENCE FINANCIÈRE",
            "transparency.title": "Où va",
            "transparency.titleHighlight": "votre don ?",
            "transparency.description": "Chaque contribution doit servir une action concrète. Nous présentons ici la répartition prévisionnelle du budget de notre première campagne.",
            "transparency.total": "BUDGET TOTAL PRÉVISIONNEL",
            "transparency.commitment": "Notre engagement",
            "transparency.commitmentText": "Nous souhaitons publier régulièrement l'évolution des dépenses et des actions réalisées afin que chaque donateur puisse comprendre l'utilisation des fonds.",

            "transparency.food": "Aide alimentaire",
            "transparency.foodDescription": "Soutien essentiel aux familles",

            "transparency.empowerment": "Autonomisation des veuves",
            "transparency.empowermentDescription": "Activités génératrices de revenus",

            "transparency.education": "Éducation & fournitures",
            "transparency.educationDescription": "Matériel scolaire et accompagnement",

            "transparency.local": "Soutien aux structures locales",
            "transparency.localDescription": "Écoles et partenaires de terrain",

            "transparency.logistics": "Administration & logistique",
            "transparency.logisticsDescription": "Organisation et suivi du projet",

            "transparency.communication": "Communication",
            "transparency.communicationDescription": "Sensibilisation et information",

            "transparency.totalLabel": "TOTAL",

            "transparency.note": "Cette répartition correspond au budget prévisionnel de la première campagne. Les montants pourront évoluer selon les besoins identifiés sur le terrain et les financements effectivement recueillis.",

            "don.label": "AGIR AVEC NOUS",
            "don.title": "Votre soutien peut devenir une nouvelle chance.",
            "don.description": "Chaque contribution participe au financement de nos programmes d'aide, d'éducation et d'autonomisation.",
            "don.button": "Je souhaite soutenir le projet",
            "don.note": "Les modalités réelles de don seront publiées lorsque le dispositif de collecte sera officiellement configuré.",

            "contact.label": "CONTACT",
            "contact.title": "Une question sur notre mission ?",
            "contact.description": "Vous souhaitez devenir partenaire, bénévole ou soutenir notre programme ?",
            "contact.name": "Nom",
            "contact.namePlaceholder": "Votre nom",
            "contact.email": "Adresse e-mail",
            "contact.emailPlaceholder": "vous@example.com",
            "contact.message": "Votre message",
            "contact.messagePlaceholder": "Votre message...",
            "contact.send": "Envoyer le message",

            "footer.tagline": "Protéger. Accompagner. Autonomiser.",
            "footer.navigation": "Navigation",
            "footer.support": "Nous soutenir",
            "footer.donate": "Faire un don",
            "footer.partner": "Devenir partenaire",
            "footer.copyright": "© 2026 Espoir & Dignité — Tous droits réservés.",
            "footer.disclaimer": "Projet de présentation — informations budgétaires prévisionnelles."

        },


        /* =================================================
           FINNOIS
           ================================================= */

        fi: {

            "nav.home": "Etusivu",
            "nav.mission": "Tehtävämme",
            "nav.actions": "Toimintamme",
            "nav.impact": "Vaikutuksemme",
            "nav.director": "Johtaja",
            "nav.transparency": "Läpinäkyvyys",
            "nav.donate": "Lahjoita",

            "hero.tag": "TOIMI • SUOJELE • VAHVISTA",
            "hero.title": "Uutta toivoa,",
            "hero.titleHighlight": "uusia mahdollisuuksia elämään.",
            "hero.description": "Tuemme leskiä ja haavoittuvassa asemassa olevia lapsia tarjoamalla konkreettista apua, mahdollisuuksia koulutukseen ja keinoja rakentaa vakaampaa tulevaisuutta.",
            "hero.support": "Tue tehtäväämme",
            "hero.mission": "Tutustu tehtäväämme",
            "hero.trustTitle": "Toimintamme perustuu ihmisarvoon",
            "hero.trustText": "Suojelemme tänään. Rakennamme huomista.",
            "hero.campaign": "ENSIMMÄINEN KAMPANJAMME",
            "hero.project": "Pilottihanke",
            "hero.budget": "Ennakoitu budjetti",
            "hero.widows": "Leskiä",
            "hero.children": "Lapsia",
            "hero.months": "Kuukautta",
            "hero.discover": "Tutustu hankkeeseen",
            "hero.scroll": "Tutustu",

            "stats.widows": "tuettavaa leskeä",
            "stats.children": "haavoittuvassa asemassa olevaa lasta",
            "stats.program": "ohjelmakuukautta",
            "stats.budget": "ennakoitu budjetti",

            "mission.label": "TEHTÄVÄMME",
            "mission.title": "Menetys ei saisi tuomita perhettä köyhyyteen.",
            "mission.p1": "Monissa heikommassa asemassa olevissa yhteisöissä puolison tai vanhemman menetys voi johtaa koko perheen taloudelliseen ahdinkoon.",
            "mission.p2": "Espoir & Dignité tukee leskiä ja haavoittuvassa asemassa olevia lapsia vastaamalla perustarpeisiin ja rakentamalla samalla kestäviä ratkaisuja.",
            "mission.p3": "Toimintamme perustuu neljään periaatteeseen:",
            "mission.principles": "suojelu, tuki, itsenäistyminen ja vastuullisuus.",

            "actions.label": "TOIMINTAMME",
            "actions.title": "Konkreettista ja kestävää apua.",
            "actions.description": "Ohjelmamme yhdistää välittömän avun ja tuen kohti itsenäisempää elämää.",

            "actions.food.title": "Ruoka-apu",
            "actions.food.text": "Ruokapakettien jakaminen erityisen haavoittuvassa asemassa oleville perheille.",

            "actions.education.title": "Koulutus",
            "actions.education.text": "Koulutarvikkeita ja tukea orpojen ja haavoittuvassa asemassa olevien lasten koulunkäyntiin.",

            "actions.empowerment.title": "Itsenäistyminen",
            "actions.empowerment.text": "Koulutusta ja tukea pienimuotoisen tulonhankinnan aloittamiseen leskille.",

            "actions.protection.title": "Lasten suojelu",
            "actions.protection.text": "Haavoittuvien tilanteiden tunnistaminen ja ohjaaminen asianmukaisten palveluiden piiriin.",

            "actions.support": "Tue tätä toimintaa →",

            "project.label": "PILOTTIHANKKEEMME",
            "project.title": "Toivoa leskille ja orvoille",
            "project.description": "Ensimmäisen kampanjamme tavoitteena on tukea haavoittuvassa asemassa olevia perheitä kuuden kuukauden alkujakson ajan.",
            "project.widows": "tavoiteltua leskeä",
            "project.children": "tuettavaa lasta",
            "project.duration": "alkuperäinen kesto",
            "project.budgetButton": "Katso budjetti",
            "project.objective": "HANKKEEN TAVOITE",
            "project.budgetDescription": "Ohjelman ensimmäisen vaiheen ennakoitu budjetti.",
            "project.pilot": "Pilottihanke — ennakoidut luvut",

            "director.label": "JOHTOMME",
            "director.title": "Ophelie Rollet",
            "director.subtitle": "Uskomus: jokainen elämä ansaitsee mahdollisuuden.",
            "director.p1": "Espoir & Dignité -järjestön perustajana Ophelie Rollet edistää visiota, joka perustuu solidaarisuuteen, ihmisarvoon ja kaikkein haavoittuvimmassa asemassa olevien perheiden tukemiseen.",
            "director.p2": "Auttamistyöhön liittyvien ensimmäisten kokemustensa myötä hän haluaa konkreettisesti parantaa leskien ja perheensä tuen menettäneiden lasten elinolosuhteita.",
            "director.quote": "« Perheen auttaminen tänään antaa sille mahdollisuuden rakentaa huomisen tulevaisuutta. »",
            "director.role": "Johtaja",

            "impact.label": "VAIKUTUKSEMME",
            "impact.title": "Muutamme avun mahdollisuuksiksi.",
            "impact.description": "Seuraamme jokaista toimintaa, jotta voimme mitata tuloksia ja kehittää ohjelmaamme jatkuvasti.",
            "impact.widows": "tuettavaa leskeä",
            "impact.children": "tuettavaa lasta",
            "impact.expenses": "seuratuista menoista",
            "impact.followup": "alkuperäistä seurantakuukautta",

            "transparency.label": "TALOUDELLINEN LÄPINÄKYVYYS",
            "transparency.title": "Mihin",
            "transparency.titleHighlight": "lahjoituksesi käytetään?",
            "transparency.description": "Jokaisen lahjoituksen tulee palvella konkreettista toimintaa. Esitämme tässä ensimmäisen kampanjamme ennakoidun budjetin jakautumisen.",
            "transparency.total": "ENNAKOITU KOKONAISBUDJETTI",
            "transparency.commitment": "Sitoumuksemme",
            "transparency.commitmentText": "Haluamme julkaista säännöllisesti tietoja menojen ja toteutettujen toimien etenemisestä, jotta jokainen lahjoittaja voi ymmärtää varojen käytön.",

            "transparency.food": "Ruoka-apu",
            "transparency.foodDescription": "Perheiden välttämätön tuki",

            "transparency.empowerment": "Leskien itsenäistyminen",
            "transparency.empowermentDescription": "Tulonhankintaa tukevat toimet",

            "transparency.education": "Koulutus ja tarvikkeet",
            "transparency.educationDescription": "Koulutarvikkeet ja tuki",

            "transparency.local": "Paikallisten rakenteiden tuki",
            "transparency.localDescription": "Koulut ja paikalliset kumppanit",

            "transparency.logistics": "Hallinto ja logistiikka",
            "transparency.logisticsDescription": "Hankkeen organisointi ja seuranta",

            "transparency.communication": "Viestintä",
            "transparency.communicationDescription": "Tiedotus ja tietoisuuden lisääminen",

            "transparency.totalLabel": "YHTEENSÄ",

            "transparency.note": "Tämä jakautuminen vastaa ensimmäisen kampanjan ennakoitua budjettia. Summat voivat muuttua kentällä tunnistettujen tarpeiden ja tosiasiallisesti saatujen rahoitusten mukaan.",

            "don.label": "TOIMI KANSSAMME",
            "don.title": "Tukesi voi antaa uuden mahdollisuuden.",
            "don.description": "Jokainen lahjoitus osallistuu apu-, koulutus- ja itsenäistymisohjelmiemme rahoittamiseen.",
            "don.button": "Haluan tukea hanketta",
            "don.note": "Todelliset lahjoitusmenettelyt julkaistaan, kun varainhankintajärjestelmä on virallisesti perustettu.",

            "contact.label": "YHTEYSTIEDOT",
            "contact.title": "Kysyttävää tehtävästämme?",
            "contact.description": "Haluatko ryhtyä kumppaniksi, vapaaehtoiseksi tai tukea ohjelmaamme?",
            "contact.name": "Nimi",
            "contact.namePlaceholder": "Nimesi",
            "contact.email": "Sähköpostiosoite",
            "contact.emailPlaceholder": "sinä@example.com",
            "contact.message": "Viestisi",
            "contact.messagePlaceholder": "Viestisi...",
            "contact.send": "Lähetä viesti",

            "footer.tagline": "Suojella. Tukea. Vahvistaa.",
            "footer.navigation": "Navigointi",
            "footer.support": "Tue meitä",
            "footer.donate": "Lahjoita",
            "footer.partner": "Ryhdy kumppaniksi",
            "footer.copyright": "© 2026 Espoir & Dignité — Kaikki oikeudet pidätetään.",
            "footer.disclaimer": "Esittelyhanke — ennakoidut budjettitiedot."

        },


        /* =================================================
           ANGLAIS
           ================================================= */

        en: {

            "nav.home": "Home",
            "nav.mission": "Our mission",
            "nav.actions": "Our actions",
            "nav.impact": "Our impact",
            "nav.director": "The director",
            "nav.transparency": "Transparency",
            "nav.donate": "Donate",

            "hero.tag": "ACT • PROTECT • EMPOWER",
            "hero.title": "Restoring hope,",
            "hero.titleHighlight": "rebuilding lives.",
            "hero.description": "We support widows and vulnerable children by providing practical assistance, access to education and the means to build a more stable future.",
            "hero.support": "Support our mission",
            "hero.mission": "Discover our mission",
            "hero.trustTitle": "An approach founded on dignity",
            "hero.trustText": "Protect today. Build tomorrow.",
            "hero.campaign": "OUR FIRST CAMPAIGN",
            "hero.project": "Pilot project",
            "hero.budget": "Projected budget",
            "hero.widows": "Widows",
            "hero.children": "Children",
            "hero.months": "Months",
            "hero.discover": "Discover the project",
            "hero.scroll": "Discover",

            "stats.widows": "widows supported",
            "stats.children": "vulnerable children",
            "stats.program": "months of programme",
            "stats.budget": "projected budget",

            "mission.label": "OUR MISSION",
            "mission.title": "Losing a loved one should not condemn a family to hardship.",
            "mission.p1": "In many disadvantaged communities, the loss of a spouse or parent can push an entire family into poverty.",
            "mission.p2": "Espoir & Dignité supports widows and vulnerable children by addressing essential needs while building sustainable solutions.",
            "mission.p3": "Our approach is based on four principles:",
            "mission.principles": "protect, support, empower and remain accountable.",

            "actions.label": "OUR ACTIONS",
            "actions.title": "Practical support designed to last.",
            "actions.description": "Our programme combines immediate assistance with support towards greater independence.",

            "actions.food.title": "Food assistance",
            "actions.food.text": "Distribution of food packages to families identified as particularly vulnerable.",

            "actions.education.title": "Education",
            "actions.education.text": "School supplies and support for the education of orphaned and vulnerable children.",

            "actions.empowerment.title": "Empowerment",
            "actions.empowerment.text": "Training and support to help widows launch small income-generating activities.",

            "actions.protection.title": "Child protection",
            "actions.protection.text": "Identification of vulnerable situations and referral to appropriate services.",

            "actions.support": "Support this action →",

            "project.label": "OUR PILOT PROJECT",
            "project.title": "Hope for Widows and Orphans",
            "project.description": "Our first campaign aims to support vulnerable families during an initial six-month period.",
            "project.widows": "targeted widows",
            "project.children": "children supported",
            "project.duration": "initial duration",
            "project.budgetButton": "View the budget",
            "project.objective": "PROJECT OBJECTIVE",
            "project.budgetDescription": "Projected budget for the first phase of the programme.",
            "project.pilot": "Pilot project — projected figures",

            "director.label": "OUR LEADERSHIP",
            "director.title": "Ophelie Rollet",
            "director.subtitle": "A belief: every life deserves a chance.",
            "director.p1": "As the founder of Espoir & Dignité, Ophelie Rollet carries a vision based on solidarity, dignity and support for the most vulnerable families.",
            "director.p2": "Following her early experiences helping people in difficulty, she wants to contribute concretely to improving the living conditions of widows and children without family support.",
            "director.quote": "« Helping a family today gives it a chance to build its future tomorrow. »",
            "director.role": "Director",

            "impact.label": "OUR IMPACT",
            "impact.title": "Turning assistance into opportunities.",
            "impact.description": "Every action is monitored to measure results and progressively improve our programme.",
            "impact.widows": "widows supported",
            "impact.children": "children supported",
            "impact.expenses": "of expenses tracked",
            "impact.followup": "of initial monitoring",

            "transparency.label": "FINANCIAL TRANSPARENCY",
            "transparency.title": "Where does",
            "transparency.titleHighlight": "your donation go?",
            "transparency.description": "Every contribution should support a concrete action. Here we present the projected allocation of the budget for our first campaign.",
            "transparency.total": "PROJECTED TOTAL BUDGET",
            "transparency.commitment": "Our commitment",
            "transparency.commitmentText": "We aim to regularly publish updates on expenses and completed activities so that every donor can understand how funds are being used.",

            "transparency.food": "Food assistance",
            "transparency.foodDescription": "Essential support for families",

            "transparency.empowerment": "Women’s empowerment",
            "transparency.empowermentDescription": "Income-generating activities",

            "transparency.education": "Education & supplies",
            "transparency.educationDescription": "School materials and support",

            "transparency.local": "Support for local organisations",
            "transparency.localDescription": "Schools and field partners",

            "transparency.logistics": "Administration & logistics",
            "transparency.logisticsDescription": "Project organisation and monitoring",

            "transparency.communication": "Communication",
            "transparency.communicationDescription": "Awareness and information",

            "transparency.totalLabel": "TOTAL",

            "transparency.note": "This allocation corresponds to the projected budget for the first campaign. Amounts may change according to needs identified in the field and funding actually received.",

            "don.label": "ACT WITH US",
            "don.title": "Your support can become a new opportunity.",
            "don.description": "Every contribution helps fund our assistance, education and empowerment programmes.",
            "don.button": "I want to support the project",
            "don.note": "Actual donation procedures will be published once the fundraising system has been officially configured.",

            "contact.label": "CONTACT",
            "contact.title": "Have a question about our mission?",
            "contact.description": "Would you like to become a partner, volunteer or support our programme?",
            "contact.name": "Name",
            "contact.namePlaceholder": "Your name",
            "contact.email": "Email address",
            "contact.emailPlaceholder": "you@example.com",
            "contact.message": "Your message",
            "contact.messagePlaceholder": "Your message...",
            "contact.send": "Send message",

            "footer.tagline": "Protect. Support. Empower.",
            "footer.navigation": "Navigation",
            "footer.support": "Support us",
            "footer.donate": "Donate",
            "footer.partner": "Become a partner",
            "footer.copyright": "© 2026 Espoir & Dignité — All rights reserved.",
            "footer.disclaimer": "Presentation project — projected budget information."

        }

    };


    /* =====================================================
       TRADUCTION
       ===================================================== */

    function getTranslation(key) {

        if (
            translations[currentLanguage] &&
            Object.prototype.hasOwnProperty.call(
                translations[currentLanguage],
                key
            )
        ) {
            return translations[currentLanguage][key];
        }

        if (
            translations.fr &&
            Object.prototype.hasOwnProperty.call(
                translations.fr,
                key
            )
        ) {
            return translations.fr[key];
        }

        return "";
    }


    /* =====================================================
       FONCTION TEXTE
       ===================================================== */

    function setText(selector, key) {

        const element =
            document.querySelector(selector);

        if (!element) {
            return;
        }

        element.textContent =
            getTranslation(key);
    }


    /* =====================================================
       NAVIGATION
       ===================================================== */

    function translateNavigation() {

        const links =
            document.querySelectorAll("#navMenu a");

        const keys = [
            "nav.home",
            "nav.mission",
            "nav.actions",
            "nav.impact",
            "nav.director",
            "nav.transparency",
            "nav.donate"
        ];

        links.forEach((link, index) => {

            if (keys[index]) {
                link.textContent =
                    getTranslation(keys[index]);
            }

        });

    }


    /* =====================================================
       HERO
       ===================================================== */

    function translateHero() {

        setText(".hero-tag", "hero.tag");

        setText(
            ".hero-description",
            "hero.description"
        );

        setText(
            ".hero-buttons .hero-btn",
            "hero.support"
        );

        setText(
            ".hero-buttons .btn-outline",
            "hero.mission"
        );


        const heroTitle =
            document.querySelector(".hero h1");

        if (heroTitle) {

            const highlight =
                heroTitle.querySelector("span");

            if (highlight) {

                heroTitle.childNodes.forEach(node => {

                    if (
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim()
                    ) {
                        node.textContent =
                            getTranslation("hero.title") + " ";
                    }

                });

                highlight.textContent =
                    getTranslation(
                        "hero.titleHighlight"
                    );

            } else {

                heroTitle.textContent =
                    getTranslation("hero.title") +
                    " " +
                    getTranslation(
                        "hero.titleHighlight"
                    );

            }

        }


        const trustStrong =
            document.querySelector(
                ".hero-trust strong"
            );

        const trustSpan =
            document.querySelector(
                ".hero-trust span"
            );

        if (trustStrong) {
            trustStrong.textContent =
                getTranslation(
                    "hero.trustTitle"
                );
        }

        if (trustSpan) {
            trustSpan.textContent =
                getTranslation(
                    "hero.trustText"
                );
        }


        setText(
            ".hero-impact-card .impact-card-top > span",
            "hero.campaign"
        );

        setText(
            ".hero-impact-card .impact-status",
            "hero.project"
        );

        setText(
            ".hero-impact-card .impact-card-main p",
            "hero.budget"
        );

        setText(
            ".impact-mini-grid div:nth-child(1) span",
            "hero.widows"
        );

        setText(
            ".impact-mini-grid div:nth-child(2) span",
            "hero.children"
        );

        setText(
            ".impact-mini-grid div:nth-child(3) span",
            "hero.months"
        );

        setText(
            ".hero-impact-card .impact-link",
            "hero.discover"
        );

    }


    /* =====================================================
       STATS
       ===================================================== */

    function translateStats() {

        setText(
            ".stats-grid .stat:nth-child(1) span",
            "stats.widows"
        );

        setText(
            ".stats-grid .stat:nth-child(2) span",
            "stats.children"
        );

        setText(
            ".stats-grid .stat:nth-child(3) span",
            "stats.program"
        );

        setText(
            ".stats-grid .stat:nth-child(4) span",
            "stats.budget"
        );

    }


    /* =====================================================
       MISSION
       ===================================================== */

    function translateMission() {

        setText(
            "#mission .section-label",
            "mission.label"
        );

        setText(
            "#mission h2",
            "mission.title"
        );


        const paragraphs =
            document.querySelectorAll(
                "#mission .mission-text p"
            );


        if (paragraphs[0]) {
            paragraphs[0].textContent =
                getTranslation("mission.p1");
        }

        if (paragraphs[1]) {
            paragraphs[1].textContent =
                getTranslation("mission.p2");
        }

        if (paragraphs[2]) {

            paragraphs[2].innerHTML =
                getTranslation("mission.p3") +
                " <strong>" +
                getTranslation("mission.principles") +
                "</strong>";

        }

    }


    /* =====================================================
       ACTIONS
       ===================================================== */

    function translateActions() {

        setText(
            "#actions .section-label",
            "actions.label"
        );

        setText(
            "#actions .section-heading h2",
            "actions.title"
        );

        setText(
            "#actions .section-heading p",
            "actions.description"
        );


        const cards =
            document.querySelectorAll(
                "#actions .action-card"
            );


        const data = [

            [
                "actions.food.title",
                "actions.food.text"
            ],

            [
                "actions.education.title",
                "actions.education.text"
            ],

            [
                "actions.empowerment.title",
                "actions.empowerment.text"
            ],

            [
                "actions.protection.title",
                "actions.protection.text"
            ]

        ];


        cards.forEach((card, index) => {

            if (!data[index]) {
                return;
            }

            const title =
                card.querySelector("h3");

            const paragraph =
                card.querySelector("p");

            const link =
                card.querySelector("a");


            if (title) {
                title.textContent =
                    getTranslation(data[index][0]);
            }

            if (paragraph) {
                paragraph.textContent =
                    getTranslation(data[index][1]);
            }

            if (link) {
                link.textContent =
                    getTranslation(
                        "actions.support"
                    );
            }

        });

    }


    /* =====================================================
       PROJET
       ===================================================== */

    function translateProject() {

        setText(
            ".project-section .section-label",
            "project.label"
        );

        setText(
            ".project-content h2",
            "project.title"
        );

        setText(
            ".project-content > p",
            "project.description"
        );

        setText(
            ".project-list div:nth-child(1) p",
            "project.widows"
        );

        setText(
            ".project-list div:nth-child(2) p",
            "project.children"
        );

        setText(
            ".project-list div:nth-child(3) p",
            "project.duration"
        );

        setText(
            ".project-content .btn",
            "project.budgetButton"
        );

        setText(
            ".project-box > span",
            "project.objective"
        );

        setText(
            ".project-box > p",
            "project.budgetDescription"
        );

        setText(
            ".project-box small",
            "project.pilot"
        );

    }


    /* =====================================================
       DIRECTRICE
       ===================================================== */

    function translateDirector() {

        setText(
            "#directrice .section-label",
            "director.label"
        );

        setText(
            "#directrice h2",
            "director.title"
        );

        setText(
            "#directrice h3",
            "director.subtitle"
        );


        const paragraphs =
            document.querySelectorAll(
                "#directrice .founder-content > p"
            );


        if (paragraphs[0]) {
            paragraphs[0].textContent =
                getTranslation("director.p1");
        }

        if (paragraphs[1]) {
            paragraphs[1].textContent =
                getTranslation("director.p2");
        }


        setText(
            "#directrice blockquote",
            "director.quote"
        );

        setText(
            ".photo-caption span",
            "director.role"
        );

    }


    /* =====================================================
       IMPACT
       ===================================================== */

    function translateImpact() {

        const section =
            document.querySelector("#impact");

        if (!section) {
            return;
        }


        setText(
            "#impact .section-label",
            "impact.label"
        );

        setText(
            "#impact h2",
            "impact.title"
        );

        setText(
            "#impact .section-heading p",
            "impact.description"
        );


        const cards =
            document.querySelectorAll(
                ".section-dark .impact-card"
            );


        const keys = [
            "impact.widows",
            "impact.children",
            "impact.expenses",
            "impact.followup"
        ];


        cards.forEach((card, index) => {

            const span =
                card.querySelector("span");

            if (
                span &&
                keys[index]
            ) {
                span.textContent =
                    getTranslation(keys[index]);
            }

        });

    }


    /* =====================================================
       TRANSPARENCE
       ===================================================== */

    function translateTransparency() {

        const sections =
            document.querySelectorAll(
                "#transparence"
            );


        sections.forEach(section => {

            const label =
                section.querySelector(
                    ".section-label, .section-eyebrow"
                );

            if (label) {
                label.textContent =
                    getTranslation(
                        "transparency.label"
                    );
            }


            const heading =
                section.querySelector("h2");


            if (heading) {

                const span =
                    heading.querySelector("span");


                if (span) {

                    heading.childNodes.forEach(node => {

                        if (
                            node.nodeType === Node.TEXT_NODE &&
                            node.textContent.trim()
                        ) {
                            node.textContent =
                                getTranslation(
                                    "transparency.title"
                                ) + " ";
                        }

                    });


                    span.textContent =
                        getTranslation(
                            "transparency.titleHighlight"
                        );

                }

            }


            const paragraph =
                section.querySelector(
                    ".section-heading p, .budget-intro > p"
                );


            if (paragraph) {
                paragraph.textContent =
                    getTranslation(
                        "transparency.description"
                    );
            }

        });


        const budgetItems =
            document.querySelectorAll(
                ".budget-item"
            );


        const budgetData = [

            [
                "transparency.food",
                "transparency.foodDescription"
            ],

            [
                "transparency.empowerment",
                "transparency.empowermentDescription"
            ],

            [
                "transparency.education",
                "transparency.educationDescription"
            ],

            [
                "transparency.local",
                "transparency.localDescription"
            ],

            [
                "transparency.logistics",
                "transparency.logisticsDescription"
            ],

            [
                "transparency.communication",
                "transparency.communicationDescription"
            ]

        ];


        budgetItems.forEach((item, index) => {

            if (!budgetData[index]) {
                return;
            }


            const title =
                item.querySelector(
                    ".budget-item-header strong"
                );

            const description =
                item.querySelector(
                    ".budget-item-header span"
                );


            if (title) {
                title.textContent =
                    getTranslation(
                        budgetData[index][0]
                    );
            }

            if (description) {
                description.textContent =
                    getTranslation(
                        budgetData[index][1]
                    );
            }

        });


        setText(
            ".budget-card-total span",
            "transparency.totalLabel"
        );


        setText(
            ".budget-disclaimer p",
            "transparency.note"
        );

    }


    /* =====================================================
       DON
       ===================================================== */

    function translateDonation() {

        setText(
            "#don .section-label",
            "don.label"
        );

        setText(
            "#don h2",
            "don.title"
        );

        setText(
            "#don p",
            "don.description"
        );

        setText(
            "#don .btn-white",
            "don.button"
        );

        setText(
            "#don .don-note",
            "don.note"
        );

    }


    /* =====================================================
       CONTACT
       ===================================================== */

    function translateContact() {

        const section =
            document.querySelector(
                ".contact-section"
            );

        if (!section) {
            return;
        }


        setText(
            ".contact-section .section-label",
            "contact.label"
        );

        setText(
            ".contact-section h2",
            "contact.title"
        );

        setText(
            ".contact-section > .container > .contact-grid > div:first-child p",
            "contact.description"
        );

        setText(
            'label[for="name"]',
            "contact.name"
        );

        setText(
            'label[for="email"]',
            "contact.email"
        );

        setText(
            'label[for="message"]',
            "contact.message"
        );

        setText(
            ".contact-form button",
            "contact.send"
        );


        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const message =
            document.getElementById("message");


        if (name) {
            name.placeholder =
                getTranslation(
                    "contact.namePlaceholder"
                );
        }

        if (email) {
            email.placeholder =
                getTranslation(
                    "contact.emailPlaceholder"
                );
        }

        if (message) {
            message.placeholder =
                getTranslation(
                    "contact.messagePlaceholder"
                );
        }

    }


    /* =====================================================
       FOOTER
       ===================================================== */

    function translateFooter() {

        setText(
            ".footer-brand + p",
            "footer.tagline"
        );


        const headings =
            document.querySelectorAll(
                ".footer-grid h4"
            );


        if (headings[0]) {
            headings[0].textContent =
                getTranslation(
                    "footer.navigation"
                );
        }

        if (headings[1]) {
            headings[1].textContent =
                getTranslation(
                    "footer.support"
                );
        }


        const supportLinks =
            document.querySelectorAll(
                ".footer-grid > div:nth-child(3) a"
            );


        if (supportLinks[0]) {
            supportLinks[0].textContent =
                getTranslation(
                    "footer.donate"
                );
        }

        if (supportLinks[1]) {
            supportLinks[1].textContent =
                getTranslation(
                    "footer.partner"
                );
        }


        const copyright =
            document.querySelector(
                ".footer-bottom p:first-child"
            );

        const disclaimer =
            document.querySelector(
                ".footer-bottom p:last-child"
            );


        if (copyright) {
            copyright.textContent =
                getTranslation(
                    "footer.copyright"
                );
        }

        if (disclaimer) {
            disclaimer.textContent =
                getTranslation(
                    "footer.disclaimer"
                );
        }

    }


    /* =====================================================
       TRADUIRE TOUT LE SITE
       ===================================================== */

    function translatePage() {

        translateNavigation();
        translateHero();
        translateStats();
        translateMission();
        translateActions();
        translateProject();
        translateDirector();
        translateImpact();
        translateTransparency();
        translateDonation();
        translateContact();
        translateFooter();

    }


    /* =====================================================
       BOUTONS DE LANGUE
       ===================================================== */

    const languageButtons =
        document.querySelectorAll(
            ".lang-btn"
        );


    function updateLanguageButtons() {

        languageButtons.forEach(button => {

            const language =
                button.getAttribute(
                    "data-lang"
                );


            const active =
                language === currentLanguage;


            button.classList.toggle(
                "active",
                active
            );


            button.setAttribute(
                "aria-pressed",
                active ? "true" : "false"
            );

        });

    }


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedLanguage =
                    button.getAttribute(
                        "data-lang"
                    );


                if (
                    !supportedLanguages.includes(
                        selectedLanguage
                    )
                ) {
                    return;
                }


                currentLanguage =
                    selectedLanguage;


                localStorage.setItem(
                    "espoirDigniteLanguage",
                    currentLanguage
                );


                document.documentElement.setAttribute(
                    "lang",
                    currentLanguage
                );


                updateLanguageButtons();
                translatePage();

            }
        );

    });


    /* =====================================================
       INITIALISATION LANGUE
       ===================================================== */

    document.documentElement.setAttribute(
        "lang",
        currentLanguage
    );


    updateLanguageButtons();
    translatePage();


    /* =====================================================
       LIENS VERS CONTACT
       ===================================================== */

    document.querySelectorAll(
        'a[href="#contact"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const contact =
                    document.querySelector(
                        ".contact-section"
                    );


                if (!contact) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const offset =
                    header
                        ? header.offsetHeight
                        : 0;


                const position =
                    contact.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       FIN PARTIE 2/2
       ===================================================== */

});
