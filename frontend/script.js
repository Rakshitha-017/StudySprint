const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const subject = subjectInput.value;

  if (task === "" || subject === "") {
    alert("Please enter task and subject");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${task} (${subject})`;
  taskList.appendChild(li);

  taskInput.value = "";
  subjectInput.value = "";
});
