import printToDom from "../src/scripts/utilities/printToDOM";

// creates form for task
const taskForm = () => {
    let html =`
    <label for = "completionDate">completion Date : </label>
    <input type = "date" name = "completionDate" id = "completionDate"></input>

    <label for = "taskName">Task Name : </label>
    <input type = "text" name = "taskName" id = "taskName"></input>`
    printToDom(html,"#taskList")
    document.querySelector("#addNewTask").textContent = " Submit.."
}

export default taskForm