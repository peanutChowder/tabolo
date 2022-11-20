const taskList = document.getElementById("task-list")
const taskEntry = document.getElementById("task-entry")
var tasks = []

chrome.storage.sync.get(['tasks'], (result) => {
    if (result.tasks != null) {
        tasks = result.tasks
        tasks.forEach(task => {
            const taskItem = createNewTask(task)
            addTaskToDOM(taskItem)
        });
    }
})

document.getElementById("task-form").addEventListener("submit", (e) => addNewTask(e))

function addTaskToDOM(taskItem) {
    taskList.appendChild(taskItem)
}

function addNewTask(e) {
    e.preventDefault()
    
    if (taskEntry.value == "") {
        return
    }

    const newTask = createNewTask({id: tasks.length, text: taskEntry.value})
    addTaskToDOM(newTask)


    tasks.push({id: tasks.length - 1, text: taskEntry.value})
    chrome.storage.sync.set({"tasks": tasks})

    taskEntry.value = ""
    return false
}

function createNewTask(taskObj) {
    let newTask = document.createElement("li")
    let checkbox = document.createElement("input")

    newTask.className = "task-item"

    checkbox.type = "checkbox"
    checkbox.className = "task-item-checkbox"

    checkbox.addEventListener("click", () => {
        tasks = tasks.filter((task) => task.id != taskObj.id)
        chrome.storage.sync.set({"tasks": tasks})
        newTask.remove()
    })

    newTask.appendChild(checkbox)
    newTask.appendChild(document.createTextNode(taskObj.text))

    return newTask
}
