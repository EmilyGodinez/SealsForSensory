/* Dark Mode */
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    
    document.body.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("dark-mode");

}

themeButton.addEventListener("click", toggleDarkMode);

/* Add Place Modal */
const modal = document.getElementById("add-place-modal");
const addPlaceLink = document.querySelector('a[href="#add-place"]');
const closeButton = document.getElementById('close-modal');

togglePlaceLink = (event) => {

    event.preventDefault();
    modal.style.display = "flex";
}

addPlaceLink.addEventListener("click", togglePlaceLink);

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.style.display = "none";
    }
});

/* Slider For Form */
const sliders = [{input: "light-slider", display: "light-val"}, {input: "sound-slider", display: "sound-val"}, {input: "crowd-slider", display: "crowd-val"}, {input: "smell-slider", display: "smell-val"}];

for (let i = 0; i < sliders.length; i++) {
    const sliderEl = document.getElementById(sliders[i].input);
    const displayEl = document.getElementById(sliders[i].display);

    sliderEl.addEventListener("input", () => {
        displayEl.textContent = sliderEl.value;
    });
}

/* Form Submission and Calculate Score */
const form = document.getElementById("add-place-form");

toggleForm = (event) => {

    event.preventDefault();

    const name = document.getElementById("place-name").value;
    const desc = document.getElementById("place-desc").value;
    const light = Number(document.getElementById("light-slider").value);
    const sound = Number(document.getElementById("sound-slider").value);
    const crowd = Number(document.getElementById("crowd-slider").value);
    const smell = Number(document.getElementById("smell-slider").value);
    const temp = document.getElementById("temp-select").value;

    
    const mean = (light + sound + crowd + smell) / 4;
    const overallScore = (10 - mean).toFixed(1);

    
    const newCard = document.createElement("div");
    newCard.classList.add("place-entry");
    newCard.innerHTML = `
        <h4>${name}</h4>
        <div class="places-container">
            <img src="img/sealy_main.png" width="300" alt="${name}">
            <div class="place-details">
                <p>Comment: ${desc}</p>
                <ul class="place-scores">
                    <li><img src="img/bulb.png" width="22" height="22"><span>${light}/10</span></li>
                    <li><img src="img/loud_sound.png" width="22" height="22"><span>${sound}/10</span></li>
                    <li><img src="img/busts_in_silhouette.png" width="22" height="22"><span>${crowd}/10</span></li>
                    <li><img src="img/nose.png" width="22" height="22"><span>${smell}/10</span></li>
                    <li><img src="img/snowflake.png" width="22" height="22"><span>${temp}</span></li>
                    <li><img src="img/bubbles.png" width="22" height="22"><span>${overallScore}/10</span></li>
                </ul>
            </div>
        </div>
    `;

    
    const existingPlaces = document.querySelectorAll(".places-container");
    const lastPlace = existingPlaces[existingPlaces.length - 1];
    lastPlace.insertAdjacentElement("afterend", newCard);

    
    form.reset();
    for (let i = 0; i < sliders.length; i++) {
        document.getElementById(sliders[i].display).textContent = "5";
    }
    modal.style.display = "none";
}

form.addEventListener("submit", toggleForm);

/* Search Box Functionality */
const searchInput = document.getElementById("search-input");
const noResultsBox = document.getElementById("no-results");
const navSearchLink = document.querySelector('a[href="#search"]');

const toggleSearch = (event) => {
    event.preventDefault();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    searchInput.focus();
};

navSearchLink.addEventListener("click", toggleSearch);

const toggleInput = () => {
    const query = searchInput.value.toLowerCase().trim();
    const allPlaces = document.querySelectorAll(".place-entry");
    let visibleCount = 0;

    for (let i = 0; i < allPlaces.length; i++) {
        const titleEl = allPlaces[i].querySelector("h4");
        let placeName = "";
        if (titleEl) {
            placeName = titleEl.textContent.toLowerCase();
        }

        if (placeName.includes(query)) {
            allPlaces[i].style.display = "block";
            visibleCount++;
        } else {
            allPlaces[i].style.display = "none";
        }
    }

    if (visibleCount === 0) {
        noResultsBox.style.display = "flex";
    } else {
        noResultsBox.style.display = "none";
    }
};

searchInput.addEventListener("input", toggleInput);

searchInput.addEventListener("keydown", (event) => {
    
    if (event.key === "Enter") {
        event.preventDefault(); 
        toggleInput();          

        const allPlaces = document.querySelectorAll(".place-entry");
        for (let i = 0; i < allPlaces.length; i++) {
            if (allPlaces[i].style.display !== "none") {
                allPlaces[i].scrollIntoView({ behavior: "smooth", block: "center" });
                break; 
            }
        }
    }
});
