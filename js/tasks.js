// --------------------------------
// AutoTrack Pro - Task Management
// --------------------------------

//Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// MIGRATION SAFETY
tasks = tasks.map(t => {
    if (!t.status) {
        t.status = t.completed ? "Completed" : "Pending";
        delete t.completed;
    }
    return t;
});

let taskChart = null;
let editingTaskId = null;


//Cache DOM elements
const taskForm = document.querySelector("#taskForm");
const taskTableBody = document.querySelector("#taskTableBody");

const totalTasksEl = document.querySelector("#totalTasks");
const pendingTasksEl = document.querySelector("#pendingTasks");
const completedTasksEl = document.querySelector("#completedTasks");

const statusFilter = document.querySelector("#statusFilter");
const sortTasks = document.querySelector("#sortTasks");

const statusSelect = document.querySelector("#status");

const taskNameInput = document.querySelector("#taskName");
const taskDescriptionInput = document.querySelector("#taskDescription");
const taskDueDateInput = document.querySelector("#taskDueDate");
const taskPriorityInput = document.querySelector("#taskPriority");
const taskChartCanvas = document.querySelector("#taskChart");


//Add new task
if (taskForm) {  //if statement protects loading without #taskForm
    taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newTask = {
        id: editingTaskId || Date.now(),
        name: taskNameInput.value,
        description: taskDescriptionInput.value,
        dueDate: taskDueDateInput.value,
        priority: taskPriorityInput.value,
        status: statusSelect.value
    };

    if (editingTaskId) {
        tasks = tasks.map(t => t.id === editingTaskId ? newTask : t);
        addActivity(`Task updated: ${newTask.name}`);
        editingTaskId = null;
    } else {
        tasks.push(newTask);
        addActivity(`Task added: ${newTask.name}`);
    }

    saveTasks();
    renderTasks();
    taskForm.reset();
});
}

//Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Render tasks to the table
function renderTasks() {
    taskTableBody.innerHTML = "";

    let filteredTasks = [...tasks];

    // Filter by status
    if (statusFilter.value === "completed") {
        filteredTasks = filteredTasks.filter(task => task.status === "Completed");
    } 
    else if (statusFilter.value === "pending") {
        filteredTasks = filteredTasks.filter(task => task.status === "Pending");
    }

    //Sort tasks
    if (sortTasks.value === "name") {
        filteredTasks.sort((a, b) => a.name.localeCompare(b.name));
    } 
    else if (sortTasks.value === "priority") {
        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } 
    else {
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    filteredTasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td>
                <span class="badge priority-badge ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>
            </td>
            
            <td>${task.status}</td>            
            
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editTask(${task.id})">
                    ✎
                </button>
            
                <button class="btn btn-sm btn-success me-2" onclick="toggleTask(${task.id})">
                    ✓
                </button>
            
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">
                    ✕
                </button>
            </td>
        `;

        taskTableBody.appendChild(row);
    });

    updateSummary();
    updateChart();
}

//Task completion toggle
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (task.status === "Pending") {
        task.status = "In Progress";
    } else if (task.status === "In Progress") {
        task.status = "Completed";
        addActivity(`Task completed: ${task.name}`);
    } else {
        task.status = "Pending";
    }

    saveTasks();
    renderTasks();
}

//Delete task
function deleteTask(id) {
    const task = tasks.find(t => t.id === id);

    if (task) {
        addActivity(`Task deleted: ${task.name}`);
    }

    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

//Update task summary (analytics)
function updateSummary() {
    totalTasksEl.textContent = tasks.length;
    pendingTasksEl.textContent = tasks.filter(t => t.status === "Pending").length;
    completedTasksEl.textContent = tasks.filter(t => t.status === "Completed").length;
}

function updateChart() {
    const pending = tasks.filter(t => t.status === "Pending").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const ctx = taskChartCanvas.getContext("2d");

    if (!ctx) return;

    if (taskChart) {
        taskChart.destroy();
    }

    if (typeof Chart === "undefined") {
    console.error("Chart.js not loaded");
    return;
}

    taskChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Pending", "In Progress", "Completed"],
            datasets: [{
                data: [pending, inProgress, completed],
                backgroundColor: [
                    "#444444",  // Pending
                    "#0d6efd",  // In Progress
                    "#c8102e"   // Completed
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: getComputedStyle(document.body).color
                    }
                }
            }
        }
    });
}


//Edit Tasks functionality
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    taskNameInput.value = task.name;
    taskDescriptionInput.value = task.description;
    taskDueDateInput.value = task.dueDate;
    taskPriorityInput.value = task.priority;
    statusSelect.value = task.status;

    editingTaskId = id;
}

//Filter/Sort changes reaction
statusFilter.addEventListener("change", renderTasks);
sortTasks.addEventListener("change", renderTasks);

//Initial render
renderTasks();
