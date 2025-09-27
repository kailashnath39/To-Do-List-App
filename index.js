function deleteTask(id) {
	const d = document;
	const q = `.taskContainer[id='${id}']`;
	const ele = d.querySelector(q);
	d.getElementsByClassName("taskListContainer")[0].removeChild(ele);
}

function changeStyleStatus(event) {
	const el = event.currentTarget;
	el.classList.toggle("checkBoxChecked");
	el.classList.toggle("checkBoxUnChecked");

	const taskContent = el
		.closest(".taskContainer")
		.querySelector(".taskContent");
	taskContent.classList.toggle("strikeText");
}

function createTask(id, content) {
	const d = document;
	let task = d.createElement("div");
	task.classList.add("taskContainer");
	task.setAttribute("id", id);
	let taskCheckBox = d.createElement("div");
	taskCheckBox.classList.add("checkBoxContainer");
	let checkBox = d.createElement("div");
	checkBox.classList.add("checkBoxUnChecked");
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
	taskContentContainer.appendChild(taskContent);

	let delButtonContainer = d.createElement("div");
	delButtonContainer.classList.add("delButtonContainer");
	let delButton = d.createElement("button");
	delButton.classList.add("roundContainer", "buttonDelete");
	delButton.innerHTML = "Delete";
	delButtonContainer.appendChild(delButton);
	delButton.setAttribute("id", id);
	delButton.addEventListener("click", () =>
		deleteTask(delButton.getAttribute("id"))
	);

	task.appendChild(taskCheckBox);
	task.appendChild(taskContentContainer);
	task.appendChild(delButtonContainer);

	d.getElementsByClassName("taskListContainer")[0].appendChild(task);
}

document.getElementById("buttonSave").addEventListener("click", () => {
	const d = document;
	const taskContent = d.getElementById("taskContent").value;
	if (taskContent.length != 0) {
		console.log(d.getElementById("taskContent").value);
		const id =
			d.getElementsByClassName("taskListContainer")[0].children.length;
		createTask(id, taskContent);
		d.getElementById("taskContent").value = "";
	}
});
