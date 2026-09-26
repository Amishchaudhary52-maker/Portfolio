```javascript
// =========================================================
// AMISH CHAUDHARY - PORTFOLIO JAVASCRIPT
// =========================================================


// ===============================
// 1. TYPING ANIMATION
// ===============================

const roles = [
    "Computer Engineering Student",
    "Web Developer",
    "Python Developer",
    "Backend Developer",
    "IoT Enthusiast"
];

const roleElement = document.querySelector(".hero-content h2");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!roleElement) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (isDeleting === false) {

        roleElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    const speed = isDeleting ? 50 : 90;

    setTimeout(typeEffect, speed);
}

typeEffect();


// ===============================
// 2. NAVBAR SCROLL EFFECT
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", function () {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(5, 12, 22, 0.97)";

        header.style.boxShadow =
            "0 5px 25px rgba(0, 0, 0, 0.3)";

    } else {

        header.style.background =
            "rgba(8, 17, 31, 0.85)";

        header.style.boxShadow = "none";
    }

});


// ===============================
// 3. SMOOTH NAVIGATION
// ===============================

const navLinks =
    document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// ===============================
// 4. ACTIVE NAVIGATION
// ===============================

const sections =
    document.querySelectorAll("section");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionBottom =
            section.offsetTop +
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");

        if (linkTarget === "#" + currentSection) {

            link.classList.add("active");
        }

    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


// ===============================
// 5. SCROLL REVEAL ANIMATION
// ===============================

const revealElements =
    document.querySelectorAll(
        ".education-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".certificate-card, " +
        ".about-content, " +
        ".contact-container"
    );

const observer =
    new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

    observer.observe(element);

});


// ===============================
// 6. BACK TO TOP BUTTON
// ===============================

const backToTop =
    document.createElement("button");

backToTop.textContent = "↑";

backToTop.className = "back-to-top";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

document.body.appendChild(backToTop);


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ===============================
// 7. PROJECT IMAGE EFFECT
// ===============================

const projectImages =
    document.querySelectorAll(
        ".project-card img"
    );

projectImages.forEach(function (image) {

    image.addEventListener(
        "mouseenter",
        function () {

            image.style.filter =
                "brightness(1.15)";
        }
    );


    image.addEventListener(
        "mouseleave",
        function () {

            image.style.filter =
                "brightness(1)";
        }
    );

});


// ===============================
// 8. CONTACT FORM VALIDATION
// ===============================

const contactForm =
    document.querySelector(
        ".contact-form form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document
                    .querySelector("#name")
                    .value
                    .trim();

            const email =
                document
                    .querySelector("#email")
                    .value
                    .trim();

            const subject =
                document
                    .querySelector("#subject")
                    .value
                    .trim();

            const message =
                document
                    .querySelector("#message")
                    .value
                    .trim();


            // Check empty fields

            if (
                name === "" ||
                email === "" ||
                subject === "" ||
                message === ""
            ) {

                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            // Check email

            if (!isValidEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            // Success

            showFormMessage(
                "Message submitted successfully!",
                "success"
            );


            contactForm.reset();

        }
    );
}


// ===============================
// 9. EMAIL VALIDATION
// ===============================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// ===============================
// 10. FORM MESSAGE
// ===============================

function showFormMessage(message, type) {

    let messageBox =
        document.querySelector(
            ".form-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement("p");

        messageBox.className =
            "form-message";

        contactForm.appendChild(
            messageBox
        );
    }


    messageBox.textContent =
        message;


    if (type === "success") {

        messageBox.style.color =
            "#00f5d4";

    } else {

        messageBox.style.color =
            "#ff6b6b";
    }


    messageBox.style.marginTop =
        "15px";

    messageBox.style.fontWeight =
        "600";


    setTimeout(function () {

        if (messageBox) {
            messageBox.remove();
        }

    }, 4000);

}


// ===============================
// 11. PAGE LOADED
// ===============================

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

        updateActiveNavigation();

    }
);


// ===============================
// 12. CONSOLE MESSAGE
// ===============================

console.log(
    "Amish Chaudhary Portfolio Loaded Successfully!"
);
```
