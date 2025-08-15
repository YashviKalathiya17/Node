const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const submitBtn = document.getElementById("submitBtn");

let editingTaskId = null;

// Fetch and display tasks
async function fetchTasks() {
  const res = await fetch("/tasks");
  const data = await res.json();
  taskList.innerHTML = "";
  data.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${task.name}</strong> - ${task.description || ""}<br>
        📅 ${task.date} | ⏳ ${task.duration} hrs | ⚡ ${task.efficiency}
      </div>
      <div>
        <button class="btn btn-warning btn-sm me-2" onclick='editTask(${JSON.stringify(task)})'>✏ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">❌ Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add or update task
taskForm.addEventListener("submit", async e => {
  e.preventDefault();
  const taskData = {
    name: document.getElementById("taskName").value,
    description: document.getElementById("taskDesc").value,
    date: document.getElementById("taskDate").value,
    duration: document.getElementById("taskDuration").value,
    efficiency: document.getElementById("taskEfficiency").value
  };

  if (editingTaskId) {
    await fetch(`/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData)
    });
    editingTaskId = null;
    submitBtn.textContent = "Add Task";
    submitBtn.classList.remove("btn-success");
    submitBtn.classList.add("btn-primary");
  } else {
    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData)
    });
  }

  taskForm.reset();
  fetchTasks();
});

// Edit task
function editTask(task) {
  document.getElementById("taskName").value = task.name;
  document.getElementById("taskDesc").value = task.description;
  document.getElementById("taskDate").value = task.date;
  document.getElementById("taskDuration").value = task.duration;
  document.getElementById("taskEfficiency").value = task.efficiency;

  editingTaskId = task.id;
  submitBtn.textContent = "Update Task";
  submitBtn.classList.remove("btn-primary");
  submitBtn.classList.add("btn-success");
}

// Delete task
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Initial load
fetchTasks();
