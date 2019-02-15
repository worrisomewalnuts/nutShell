import API from "../utilities/apiManager";
import createTasks from "./createTasks";
import taskForm from "../../../api/taskForm";

// const makeObject = (id) => {
//     "id": 1,
//     "userId": 1,
//     "taskName": "Shopping",
//     "completionDate": "02/12/19",
//     "completionStatus": false
// }
const $ = document.querySelector.bind(document)

const taskManager = {
    EL: () => {
        $("#taskList").addEventListener("click",
            (event) => {
                if (event.target.id.startsWith("box--")) {
                    const id = event.target.id.split("--")[1]
                    taskManager.complete(id)
                }
                else {
                    if (event.target.id.startsWith("edit--")) {
                        const id = event.target.id.split("--")[1]
                        taskManager.edit(id)
                    } else {
                        if (event.target.id.startsWith("del--")) {
                            const id = event.target.id.split("--")[1]
                            taskManager.delete(id)
                        }
                    }
                }
            })
    },
    complete: (id) => {
        API.GET(`tasks/${id}`)
            .then((task) => {
                task.completionStatus = true
                return (API.EDIT(`tasks/${task.id}`, task))
            }).then(createTasks)
    },
    edit: (id) => {
        taskForm()
        API.GET(`tasks/${id}`)
        .then((task) => {
                $("#taskName").value = task.taskName
                $("#completionDate").value = task.completionDate
                $("#addNewTask").textContent = " Update"
                $("#addNewTask").classList = id
            })
    },
    delete: (id) => {
        API.DELETE(`tasks/${id}`).then(createTasks)
    },
    add: () => {
        //submit button
        $("#addNewTask").addEventListener("click",
            () => {
                if ($("#addNewTask").textContent === " Submit..") {
                    let obj = {
                        userId: $("#userId").value,
                        taskName: $("#taskName").value,
                        completionDate: $("#completionDate").value,
                        completionStatus: false
                    }
                    API.POST("tasks", obj).then(createTasks)
                    $("#addNewTask").textContent = " Submit.."
                } else
                {
                    //update -- after edit
                    if ($("#addNewTask").textContent === " Update") {
                        let obj = {
                            userId: $("#userId").value,
                            taskName: $("#taskName").value,
                            completionDate: $("#completionDate").value,
                            completionStatus: false,
                            id : $("#addNewTask").classList.value
                        }
                        API.EDIT(`tasks/${obj.id}`, obj)
                            .then(createTasks)
                    }
                    else {
                        //adding new form
                        taskForm()
                    }
                }
            }
        )
    }
}

export default taskManager