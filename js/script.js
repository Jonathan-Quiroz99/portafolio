const buttons = {
    es: document.getElementById("lang-es"),
    en: document.getElementById("lang-en")
};

const pageTitle = {
    es: "Jonathan Quiroz | Desarrollador de Software",
    en: "Jonathan Quiroz | Software Developer"
};

function changeLanguage(language) {

    // Change HTML language
    document.documentElement.lang = language;

    // Change all elements with translation attributes
    document.querySelectorAll("[data-es][data-en]").forEach(element => {
        element.textContent = element.dataset[language];
    });

    document.querySelectorAll("[data-alt-es][data-alt-en]").forEach(element => {
        element.alt = element.dataset[`alt-${language}`];
    });

    // Update language buttons
    buttons.es.classList.toggle("active", language === "es");
    buttons.en.classList.toggle("active", language === "en");

    // Change browser tab title
    document.title = pageTitle[language];

    // Remember selected language
    localStorage.setItem("language", language);
}

buttons.es.addEventListener("click", () => {
    changeLanguage("es");
});

buttons.en.addEventListener("click", () => {
    changeLanguage("en");
});

const savedLanguage = localStorage.getItem("language") || "es";

changeLanguage(savedLanguage);

document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {

        const images = carousel.querySelectorAll(".carousel-track img");
        const previousButton = carousel.querySelector(".carousel-prev");
        const nextButton = carousel.querySelector(".carousel-next");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        if (images.length === 0) return;

        let currentIndex = 0;


        /*
         * Create navigation dots
         */

        images.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add("carousel-dot");

            dot.setAttribute(
                "aria-label",
                `Show image ${index + 1}`
            );

            dot.addEventListener("click", () => {
                showSlide(index);
            });

            dotsContainer.appendChild(dot);

        });


        const dots = dotsContainer.querySelectorAll(".carousel-dot");


        /*
         * Show selected image
         */

        function showSlide(index) {

            currentIndex = index;

            images.forEach((image, imageIndex) => {

                image.classList.toggle(
                    "active",
                    imageIndex === currentIndex
                );

            });


            dots.forEach((dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentIndex
                );

            });

        }


        /*
         * Previous image
         */

        previousButton.addEventListener("click", () => {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }

            showSlide(currentIndex);

        });


        /*
         * Next image
         */

        nextButton.addEventListener("click", () => {

            currentIndex++;

            if (currentIndex >= images.length) {
                currentIndex = 0;
            }

            showSlide(currentIndex);

        });


        /*
         * Show first image
         */

        showSlide(0);

    });

});