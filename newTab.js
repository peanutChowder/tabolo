const taskList = document.getElementById("task-list")
const taskEntry = document.getElementById("task-entry")

document.getElementById("task-form").addEventListener("submit", (e) => addTask(e))



function addTask(e) {
    e.preventDefault()
    console.log("Enter")
    taskList.appendChild(createNewTask(taskEntry.value))
    taskEntry.value = ""
    return false
}

function createNewTask(taskText) {
    let newTask = document.createElement("li")
    let checkbox = document.createElement("input")

    newTask.className = "task-item"

    checkbox.type = "checkbox"
    checkbox.className = "task-item-checkbox"
    checkbox.addEventListener("click", () => {
        newTask.remove()
    })

    newTask.appendChild(checkbox)
    newTask.appendChild(document.createTextNode(taskText))

    return newTask
}
