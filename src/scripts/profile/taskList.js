import printToDom from "../utilities/printToDOM";

//html string for eack task
const listHtml = (task) =>`
    <section class="profileCard">
    <div id = "task--${task.id}"> <span class = "taskDate"> ${task.completionDate}</span>
     <span class = "taskName">${task.taskName}</span> </div>
    <input id = "box--${task.id}" type="checkbox" name="completed" value=false> Completed?
    <button id = "edit--${task.id}">Edit Task</button>
    <button id = "del--${task.id}">Delete Task </button>
    <hr/>
    </section>
`

// make a task list and post it to DOM
const taskList = (tasks) => {
    let htmlStr = "<strong> Completion Date  Task Name  </strong>"
    tasks.sort((a, b) => new Date(a.completionDate) - new Date(b.completionDate))
    tasks.forEach(task => {
        htmlStr += listHtml(task)
    });
    printToDom(htmlStr, "#taskList")
}

export default taskList