/*****************************Solution One without Local Storage **************************** */



// window.addEventListener('load', () => {
//     const form = document.querySelector("#new-task-form");
//     const input = document.querySelector("#new-task-input");
//     const list_el = document.querySelector("#tasks");
//     console.log(form);

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const task = input.value;
//         if (!task) {
//             alert("Please fill out the task");
//             return;
//         }
//         const task_el = document.createElement("div");
//         task_el.className = "task";
//         const task_content_el = document.createElement("div");
//         task_content_el.classList.add("content");
//         const task_input_el = document.createElement("input");
//         task_input_el.classList.add("text");
//         task_input_el.type = "text";
//         task_input_el.value = task;
//         task_input_el.setAttribute("readonly", "readonly");
//         task_content_el.appendChild(task_input_el);
//         task_el.appendChild(task_content_el);
//         const task_actions_el = document.createElement("div");
//         task_actions_el.classList.add("actions");
//         const task_edit_el = document.createElement("button");
//         task_edit_el.classList.add("edit");
//         task_edit_el.innerHTML = "Edit";

//         const task_delete_el = document.createElement("button");
//         task_delete_el.classList.add("delete");
//         task_delete_el.innerHTML = "Delete";
//         task_actions_el.appendChild(task_edit_el);
//         task_actions_el.appendChild(task_delete_el);
//         task_el.appendChild(task_actions_el);
//         list_el.appendChild(task_el);
//         input.value = "";
//         task_edit_el.addEventListener("click", () => {
//             if (task_edit_el.innerText.toLowerCase() == "edit") {
//                 task_input_el.removeAttribute("readonly");
//                 task_input_el.focus();
//                 task_edit_el.innerHTML = "Save";
//             } else {
//                 task_input_el.setAttribute("readOnly", "readOnly");
//                 task_edit_el.innerHTML = "Edit";
//             }
//         });
//         task_delete_el.addEventListener("click", () => {
//             list_el.removeChild(task_el);
//         });


//     });

// });





/*************************Solution Two With Local Sotrage **************************** */




let form = document.querySelector("#new-task-form");
let input = document.querySelector("#new-task-input");
let list_el = document.querySelector("#tasks");
let arrayOfTasks = [];
getDataFromLocalStorage();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value !== "") {
        addTasksToArray(input.value);
        input.value = "";
    }
});

function addTasksToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
    }

    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    list_el.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let task_el = document.createElement("div");
        task_el.classList.add("task");
        task_el.setAttribute("data-id", task.id);
        let task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        let task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task.title;
        task_input_el.setAttribute("readonly", "readonly");
        task_content_el.appendChild(task_input_el);
        task_el.appendChild(task_content_el);
        let task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");
        let task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";
        let task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);
        list_el.appendChild(task_el);
        task_delete_el.addEventListener("click", () => {
            deleteTaskWith(task_el.getAttribute("data-id"));
            list_el.removeChild(task_el);

        })
        task_edit_el.addEventListener("click", () => {

            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerHTML = "save";

            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerHTML = "edit";
                let value = task_input_el.value;
                updateTaskWith(task_el.getAttribute("data-id"), value);
            }
        })
    });


}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        arrayOfTasks = JSON.parse(data);
    }
    addElementsToPageFrom(arrayOfTasks);
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function updateTaskWith(taskId, value) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].title = value;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}