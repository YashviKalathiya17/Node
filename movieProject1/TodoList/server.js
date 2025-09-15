const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

let tasks = [];
let nextId = 1;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const task = { id: nextId++, ...req.body };
  tasks.push(task);
  res.json({ message: "Task added successfully!" });
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body, id };
    res.json({ message: "Task updated successfully!" });
  } else {
    res.status(404).json({ message: "Task not found!" });
  }
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: "Task deleted successfully!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
