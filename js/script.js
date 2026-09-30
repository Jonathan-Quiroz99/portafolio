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