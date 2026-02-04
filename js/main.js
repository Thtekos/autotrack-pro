// ----------------------
// Latest Activity Logic
// ----------------------

let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];

function addActivity(message) {
    const activity = {
        message: message,
        timestamp: new Date().toLocaleString()
    };

    // newest first
    activityLog.unshift(activity);

    // Limit to last 5 activities
    activityLog = activityLog.slice(0, 5);

    localStorage.setItem("activityLog", JSON.stringify(activityLog));
}

function renderActivity() {
    const activityList = document.getElementById("activityList");

    // prevents errors on other pages
    if (!activityList) return; 

    activityList.innerHTML = "";

    if (activityLog.length === 0) {
        activityList.innerHTML = `
            <li class="list-group-item bg-dark text-light">
                No recent activity recorded.
            </li>
        `;
        return;
    }

    activityLog.forEach(activity => {
        const item = document.createElement("li");
        item.className = "list-group-item bg-dark text-light";
        item.innerHTML = `
            <strong>${activity.message}</strong>
            <br>
            <small class="text-secondary">${activity.timestamp}</small>
        `;
        activityList.appendChild(item);
    });
}

//Render
renderActivity();


// ------------------------------
// Dark Mode Logic
// -------------------------------

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Load saved preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
}

// Toggle dark mode
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
}

// --------------------------------
// Public API: Performance Insight
// --------------------------------

async function loadPerformanceQuote() {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");

    // Only run on pages that have the section
    if (!quoteText || !quoteAuthor) return;

    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        quoteText.textContent = `"${data.content}"`;
        quoteAuthor.textContent = `— ${data.author}`;
    } catch (error) {
        quoteText.textContent = "Precision comes from preparation.";
        quoteAuthor.textContent = "— AutoTrack Pro";
    }
}

// Load API content on page load
loadPerformanceQuote();


// ----------------------------------
// Public API: Weather (Open-Meteo)
// --------------------------------

async function loadWeather() {
    const locationEl = document.getElementById("weatherLocation");
    const tempEl = document.getElementById("weatherTemp");
    const conditionEl = document.getElementById("weatherCondition");

    // Only run on pages that have the widget
    if (!locationEl || !tempEl || !conditionEl) return;

    try {
        // Athens coordinates (can be changed)
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=37.9838&longitude=23.7275&current_weather=true"
        );

        const data = await response.json();
        const weather = data.current_weather;

        locationEl.textContent = "Athens, Greece";
        tempEl.textContent = `${weather.temperature}°C`;
        conditionEl.textContent = `Wind: ${weather.windspeed} km/h`;

    } catch (error) {
        locationEl.textContent = "Weather unavailable";
        tempEl.textContent = "--";
        conditionEl.textContent = "";
    }
}

// Load weather on page load
loadWeather();


// --------------------------
// Contact Form Validation
// -----------------------------

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let isValid = true;

        // Name validation
        if (name.value.trim() === "") {
            name.classList.add("is-invalid");
            isValid = false;
        } else {
            name.classList.remove("is-invalid");
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("is-invalid");
            isValid = false;
        } else {
            email.classList.remove("is-invalid");
        }

        // Message validation
        if (message.value.trim() === "") {
            message.classList.add("is-invalid");
            isValid = false;
        } else {
            message.classList.remove("is-invalid");
        }

        // If valid, show confirmation
        if (isValid) {
            alert("Thank you for contacting AutoTrack Pro. We will get back to you shortly.");
            contactForm.reset();
        }
    });
}