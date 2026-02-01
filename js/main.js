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