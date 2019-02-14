import printToDom from "../utilities/printToDOM";
import taskHTML from "./taskHTML";
import API from "../utilities/apiManager";
import taskList from "./taskList";

const $ = document.querySelector.bind(document)
printToDom(taskHTML,"#tasks")
API.GET(`tasks/${$(userId).value}`).then (tasks => taskList(tasks))