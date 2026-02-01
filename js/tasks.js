// --------------------------------
// AutoTrack Pro - Task Management
// --------------------------------

//Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Cache DOM elements
const taskForm = document.getElementById("taskForm");
const taskTableBody = document.getElementById("taskTableBody");

const totalTasksEl = document.getElementById("totalTasks");
const pendingTasksEl = document.getElementById("pendingTasks");
const completedTasksEl = document.getElementById("completedTasks");

const statusFilter = document.getElementById("statusFilter");
const sortTasks = document.getElementById("sortTasks");


//Add new task
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newTask = {
        id: Date.now(),
        name: document.getElementById("taskName").value,
        description: document.getElementById("taskDescription").value,
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();

    //Connect activity to task action
    addActivity(`Task added: ${newTask.name}`);
});

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
        filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (statusFilter.value === "pending") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    //Sort tasks
    if (sortTasks.value === "name") {
        filteredTasks.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    filteredTasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td>
                <span class="badge ${
                    task.priority === "High" ? "bg-danger" :
                    task.priority === "Medium" ? "bg-secondary" : "bg-light text-dark"
                }">
                    ${task.priority}
                </span>
            </td>
            <td>${task.completed ? "Completed" : "Pending"}</td>
            <td>
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
}

//Task completion toggle
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;

    if (task.completed) {
        addActivity(`Task completed: ${task.name}`);
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
    pendingTasksEl.textContent = tasks.filter(t => !t.completed).length;
    completedTasksEl.textContent = tasks.filter(t => t.completed).length;
}

//Filter/Sort changes reaction
statusFilter.addEventListener("change", renderTasks);
sortTasks.addEventListener("change", renderTasks);

//Initial render
renderTasks();

