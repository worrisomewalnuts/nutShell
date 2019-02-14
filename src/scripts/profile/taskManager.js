const taskManager = {
    EL: () => {
        document.querySelector("#taskList").addEventListener("click",
            (event) => {
                if (event.target.id.startsWith("task--")) {
                    const id = event.target.id.split("--")
                    this.complete(id)
                }
            }
        )
    },
    complete: (id) => {
    }
}

export default taskManager