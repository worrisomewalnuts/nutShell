import API from "../utilities/apiManager";
import createTasks from "./createTasks";
import taskForm from "./taskForm";
import validate from "../utilities/dataValidation"

const $ = document.querySelector.bind(document)

const makeObject = () => {
    return {
        userId: $("#userId").value,
        taskName: $("#taskName").value,
        completionDate: $("#completionDate").value,
        completionStatus: false
    }
}

const submitButtonStatus = () => {
    //submit button
    if ($("#addNewTask").textContent === " Submit..") {
         let obj = makeObject()
        if (validate(obj.taskName, obj.completionDate)) {
            API.POST("tasks", obj).then(createTasks)
            $("#addNewTask").textContent = " Submit.."
        }
    } else {
        //update -- after edit
        if ($("#addNewTask").textContent === " Update") {
            let obj = makeObject()
            obj.id = $("#addNewTask").classList.value
            API.EDIT(`tasks/${obj.id}`, obj)
                .then(createTasks)
        }
        else {
            //adding new form
            taskForm()
             $("#completionDate").value = new Date().toISOString().substr(0, 10);
            taskManager.taskNameEL()
        }
    }
}


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
    //event listener for check box clicked
    complete: (id) => {
        API.GET(`tasks/${id}`)
            .then((task) => {
                task.completionStatus = true
                return (API.EDIT(`tasks/${task.id}`, task))
            }).then(createTasks)
    },
    //edit the task name
    edit: (id) => {
        taskForm()
        API.GET(`tasks/${id}`)
            .then((task) => {
                $("#taskName").value = task.taskName
                $("#completionDate").value = task.completionDate
                $("#completionDate").disabled = true
                $("#taskName").focus()
                $("#addNewTask").textContent = " Update"
                // passing id of task as class
                $("#addNewTask").classList = id
                taskManager.taskNameEL()
            })
    },

    delete: (id) => {
        API.DELETE(`tasks/${id}`).then(createTasks)
    },
    taskNameEL: () => {
        $("#taskName").addEventListener("keyup",
            (key) => {
                if (key.keyCode === 13)
                    submitButtonStatus()
            })
    },
    add: () => {
        $("#addNewTask").addEventListener("click",
            () => {
                submitButtonStatus()
            })
    }
}

export default taskManager