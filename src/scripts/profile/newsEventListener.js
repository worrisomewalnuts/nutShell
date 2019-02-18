import newsForm from "./newsForm"
import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager"
import createNews from "./createNews"
import editNewsForm from "./editNewsForm"

const newsEventListener = () => {
    document.querySelector("#news").addEventListener("click", (event) => {
        let userId = document.querySelector("#userId").value
        // ADD NEWS ITEM button
        if (event.target.id === "addNews") {
            let newsFormHTML = newsForm()
            printToDom(newsFormHTML, "#newsFormSection")

            // SUBMIT button
        } else if (event.target.id === "submitNews") {
            let news = document.querySelector("#newsTitle").value
            let date = document.querySelector("#newsDate").value
            let newsSynopsis = document.querySelector("#newsSynopsis").value
            let newsURL = document.querySelector("#newsURL").value

            let newNewsObject = {
                news: news,
                date: date,
                newsSynopsis: newsSynopsis,
                newsURL: newsURL,
                userId: parseInt(userId)
            }

            API.POST("news", newNewsObject)
                .then(createNews)

        // DELETE button
        } else if (event.target.id.startsWith("deleteNews")) {
            // Find ID of news item to remove
            let idToDelete = event.target.id.split("--")[1]
            let stringToDelete = `news/${idToDelete}`
            // Delete from API
            API.DELETE(stringToDelete)
                // Re-load news list
                .then(response => {
                    createNews()
                })

        // EDIT button
        } else if (event.target.id.startsWith("editNewsButton")) {
            // Find ID of news item to edit
            let idToEdit = event.target.id.split("--")[1]
            // Show edit form
            let editFormHTML = editNewsForm(idToEdit)
            printToDom(editFormHTML, "#newsFormSection")

            // UPDATE button
            document.querySelector("#updateNews").addEventListener("click", () => {
                let news = document.querySelector("#editNewsTitle").value
                let newsSynopsis = document.querySelector("#editNewsSynopsis").value
                let date = document.querySelector(`#newsDate--${idToEdit}`).value
                let newsURL = document.querySelector(`#newsLink--${idToEdit}`).value

                let updatedNewsObject = {
                    news: news,
                    date: date,
                    newsSynopsis: newsSynopsis,
                    newsURL: newsURL,
                    userId: parseInt(userId)
                }

                let apiString = `news/${idToEdit}`
                // API call
                API.EDIT(apiString, updatedNewsObject)
                    .then(response => {
                        createNews()
                    })

                // Remove edit form
                document.querySelector("#newsFormSection").innerHTML = ""
            })
    }
})
}

export default newsEventListener