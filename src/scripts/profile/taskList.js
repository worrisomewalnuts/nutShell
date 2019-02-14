import printToDom from "./utilities/printToDOM";

const listHtml = (task) =>
    `<div id = "task--${task.id}"> ${task.taskName} ${task.completionDate}</div>
    <input type="checkbox" name="completed" value=false> completed? <br>
`
const taskList = (tasks) => {
    let htmlStr = ""
    tasks.forEach(task => {
        htmlStr += listHtml(task)
    });
    printToDom(htmlStr, "#taskList")
}

export default taskList