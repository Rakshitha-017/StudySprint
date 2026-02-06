/* ---------------- TASK LOGIC ---------------- */

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const subject = subjectInput.value;

  if (task === "" || subject === "") {
    alert("Please enter task and subject");
    return;
  }

  const newTask = {
    id: Date.now(),
    task,
    subject,
    completed: false
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  taskInput.value = "";
  subjectInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration:${t.completed ? "line-through" : "none"}">
        ${t.task} (${t.subject})
      </span>
      <button onclick="toggleTask(${t.id})">✔</button>
      <button onclick="deleteTask(${t.id})">🗑</button>
    `;

    taskList.appendChild(li);
  });

  // progress bar
  const completed = tasks.filter(t => t.completed).length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  progressBar.style.width = percent + "%";
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();

/* ---------------- POMODORO + FOCUS MODE + ANIMATION ---------------- */

let time = 1500;
let timer;
let running = false;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const taskSection = document.getElementById("taskSection");

function updateTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;

    // 🔥 FOCUS MODE ON
    taskSection.classList.add("hidden");

    // 🔥 TIMER ANIMATION ON
    timeDisplay.classList.add("running");

    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateTime();
      } else {
        clearInterval(timer);
        alert("Time's up! Take a break 😌");

        // restore UI
        taskSection.classList.remove("hidden");
        timeDisplay.classList.remove("running");
        running = false;
      }
    }, 1000);
  }
});

pauseBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timer);

  // restore UI
  taskSection.classList.remove("hidden");
  timeDisplay.classList.remove("running");
});

resetBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timer);
  time = 1500;
  updateTime();

  // restore UI
  taskSection.classList.remove("hidden");
  timeDisplay.classList.remove("running");
});
