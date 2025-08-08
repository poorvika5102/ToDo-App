const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const darkModeToggle = document.getElementById("darkModeToggle");

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);
addTaskBtn.addEventListener("click", addTask);
darkModeToggle.addEventListener("click", toggleDarkMode);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = "";
}

function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    li.textContent = text;
    if (completed) li.classList.add("completed");

    // Mark complete toggle
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskStatusInLocalStorage(text, li.classList.contains("completed"));
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        deleteTaskFromLocalStorage(text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ task, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTaskElement(t.task, t.completed));

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
    }
}

function deleteTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t => t.task === taskText ? { task: t.task, completed } : t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}
