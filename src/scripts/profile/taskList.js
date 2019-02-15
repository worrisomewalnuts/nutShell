import printToDom from "../utilities/printToDOM";

//html string for eack task
const listHtml = (task) =>
    `<div id = "task--${task.id}"> ${task.taskName} ${task.completionDate}</div>
    <input id = "box--${task.id}" type="checkbox" name="completed" value=false> completed?
    <button id="edit--${task.id}">Edit Task</button>
    <button id="del--${task.id}">Delete Task </button>
    <hr/>
`

// make a task list and post it to DOM
const taskList = (tasks) => {
    let htmlStr = ""
    tasks.forEach(task => {
        htmlStr += listHtml(task)
    });
    printToDom(htmlStr, "#taskList")
}

export default taskList