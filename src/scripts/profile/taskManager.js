const taskManager = {
    EL: () => {

        document.querySelector("#taskList").addEventListener("click",
            (event) => {
                console.log(event.target.id)

                if (event.target.id.startsWith("task--")) {
                    const id = event.target.id.split("--")
                    this.complete(id)
                }
            }
        )
    },
    complete: (id) => {
        console.log(id)
    }
}

export default taskManager