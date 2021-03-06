import printToDom from "../utilities/printToDOM";
import taskHTML from "./taskHTML";
import API from "../utilities/apiManager";
import taskList from "./taskList";
import taskManager from "./taskManager";


const createTasks = () => {
    const $ = document.querySelector.bind(document)

    printToDom(taskHTML(),"#tasks")
    const id = $("#userId").value
    //get data for userId and get only completion Status is false
    API.GET(`tasks?userId=${id}&completionStatus=false`)
        .then (tasks => taskList(tasks))
    //trigger event listener
    taskManager.EL()
    taskManager.add()
}

export default createTasks
