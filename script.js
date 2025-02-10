document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

// Add a task
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  let tasks = getStoredTasks();
  tasks.push({ text: taskText, completed: false });

  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
}

// Function to render tasks with edit functionality
function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = getStoredTasks();

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Task text
    let span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }
    span.onclick = () => toggleTask(index);

    li.appendChild(span);

    // Buttons container
    let buttonGroup = document.createElement("div");

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm me-2";
    editBtn.textContent = "✏️ Edit"; // Added text/icon
    editBtn.onclick = () => editTask(index);

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "🗑 Delete"; // Added text/icon
    deleteBtn.onclick = () => deleteTask(index);

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(buttonGroup);

    taskList.appendChild(li);
  });
}

// Function to edit a task
function editTask(index) {
  let tasks = getStoredTasks();
  let newTaskText = prompt("Edit task:", tasks[index].text);

  if (newTaskText !== null) {
    // If user doesn't cancel
    newTaskText = newTaskText.trim();
    if (newTaskText !== "") {
      tasks[index].text = newTaskText;
      saveTasks(tasks);
      renderTasks(); // Re-render the updated task list
    } else {
      alert("Task cannot be empty!");
    }
  }
}

// Toggle task completion
function toggleTask(index) {
  let tasks = getStoredTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  let tasks = getStoredTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// Storing the task on user
function getStoredTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks when page loads
function loadTasks() {
  renderTasks();
}
