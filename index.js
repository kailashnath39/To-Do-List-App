function deleteTask(event) {
	const taskContainer = event.currentTarget.closest(".taskContainer");
	const taskListContainer = event.currentTarget.closest(".taskListContainer");
	tasks.splice(parseInt(taskContainer.getAttribute("id")), 1);
	taskListContainer.removeChild(taskContainer);
}

function changeStyleStatus(event) {
	const el = event.currentTarget;
	el.classList.toggle("checkBoxChecked");
	el.classList.toggle("checkBoxUnChecked");

	const taskContentContainer = el.closest(".taskContainer");
	const id = parseInt(taskContentContainer.getAttribute("id"));
	tasks[id]["completionStatus"] = !tasks[id]["completionStatus"];
	const taskContent = taskContentContainer.querySelector(".taskContent");
	taskContent.classList.toggle("strikeText");
}

function createTask(id, content, completionStatus) {
	const d = document;
	let task = d.createElement("div");
	task.setAttribute("id", id);
	task.classList.add("taskContainer");
	let taskCheckBox = d.createElement("div");
	taskCheckBox.classList.add("checkBoxContainer");
	let checkBox = d.createElement("div");
	if (completionStatus) checkBox.classList.add("checkBoxChecked");
	else checkBox.classList.add("checkBoxUnChecked");
	let tickMark = d.createElement("div");
	tickMark.classList.add("tickMark");
	checkBox.appendChild(tickMark);
	checkBox.addEventListener("click", (event) => {
		changeStyleStatus(event);
	});
	taskCheckBox.appendChild(checkBox);

	let taskContentContainer = d.createElement("div");
	taskContentContainer.classList.add("taskContentContainer");
	let taskContent = d.createElement("p");
	taskContent.innerHTML = content;
	taskContent.classList.add("taskContent");
	if (completionStatus) taskContent.classList.add("strikeText");
	taskContentContainer.appendChild(taskContent);

	let delButtonContainer = d.createElement("div");
	delButtonContainer.classList.add("delButtonContainer");
	let delButton = d.createElement("button");
	delButton.classList.add("roundContainer", "buttonRemove");
	delButton.innerHTML = "Remove";
	delButtonContainer.appendChild(delButton);
	delButton.addEventListener("click", (event) => deleteTask(event));

	task.appendChild(taskCheckBox);
	task.appendChild(taskContentContainer);
	task.appendChild(delButtonContainer);

	d.getElementsByClassName("taskListContainer")[0].appendChild(task);
}

let tasks = localStorage.getItem("tasks");
if (tasks) {
	tasks = JSON.parse(tasks);
	for (let i = 0; i < tasks.length; i++) {
		createTask(i, tasks[i]["taskContent"], tasks[i]["completionStatus"]);
	}
} else {
	tasks = [];
	localStorage.setItem("tasks", JSON.stringify([]));
}

document.getElementById("buttonAdd").addEventListener("click", () => {
	const d = document;
	const taskContent = d.getElementById("taskContent").value;
	if (taskContent.length != 0) {
		const id =
			d.getElementsByClassName("taskListContainer")[0].children.length;
		let task = { taskContent: taskContent, completionStatus: false };
		tasks.push(task);
		createTask(id, taskContent);
		d.getElementById("taskContent").value = "";
	}
});

window.addEventListener("beforeunload", (event) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
});
