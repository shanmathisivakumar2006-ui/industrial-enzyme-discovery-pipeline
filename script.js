/* =========================================================
   INDUSTRIAL ENZYME DISCOVERY PIPELINE
   Website Interactions
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       Smooth navigation
    ----------------------------------------------------- */

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId !== "#") {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });


    /* -----------------------------------------------------
       Active navigation link
    ----------------------------------------------------- */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                currentSection &&
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* -----------------------------------------------------
       Scroll reveal animation
    ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".info-card, .organism-card, .feature-card, .tool-card, .workflow-step, .stat-card"
    );

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        revealObserver.observe(element);

    });


    /* -----------------------------------------------------
       Statistics counter animation
    ----------------------------------------------------- */

    const counters = document.querySelectorAll("[data-count]");

    function animateCounter(element) {

        const target = parseInt(
            element.getAttribute("data-count"),
            10
        );

        if (isNaN(target)) {
            return;
        }

        let current = 0;

        const duration = 1200;
        const steps = 60;
        const increment = target / steps;

        const timer = setInterval(function () {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            element.textContent = Math.floor(current);

        }, duration / steps);

    }


    const counterObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });


    /* -----------------------------------------------------
       Back to top button
    ----------------------------------------------------- */

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backToTop.style.position = "fixed";
    backToTop.style.bottom = "25px";
    backToTop.style.right = "25px";
    backToTop.style.width = "45px";
    backToTop.style.height = "45px";
    backToTop.style.borderRadius = "50%";
    backToTop.style.border = "none";
    backToTop.style.background = "#37c99b";
    backToTop.style.color = "#06241c";
    backToTop.style.fontSize = "22px";
    backToTop.style.fontWeight = "bold";
    backToTop.style.cursor = "pointer";
    backToTop.style.display = "none";
    backToTop.style.zIndex = "999";

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.style.display = "block";

        } else {

            backToTop.style.display = "none";

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* -----------------------------------------------------
       Module card interaction
    ----------------------------------------------------- */

    const moduleCards = document.querySelectorAll(
        ".feature-card, .info-card"
    );

    moduleCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-5px)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0)";

        });

    });


    /* -----------------------------------------------------
       Console confirmation
    ----------------------------------------------------- */

    console.log(
        "Industrial Enzyme Discovery Pipeline loaded successfully."
    );

    console.log(
        "Modules: Genomic Library Construction → Functional Screening → Structural Characterization"
    );

});
