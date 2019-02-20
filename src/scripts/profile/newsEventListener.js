import newsForm from "./newsForm"
import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager"
import createNews from "./createNews"
import editNewsForm from "./editNewsForm"
import { isEmpty, isProfanity } from "../utilities/dataValidation"

const $ = document.querySelector.bind(document)


// Submit News Button
const SubmitNews = (userId) => {
    let news = $("#newsTitle").value
    let newsSynopsis = $("#newsSynopsis").value
    let newsURL = $("#newsURL").value

    //run data validation and create new news if info is passed
    if (isEmpty(news) || isEmpty(newsSynopsis) || isEmpty(newsURL)) {
        alert("One or more fields are empty")
    } else if (isProfanity(news) || isProfanity(newsSynopsis) || isProfanity(newsURL)) {
        alert("One or more fields contain profanity")
    } else {
        let newNewsObject = {
            news: news,
            newsSynopsis: newsSynopsis,
            newsURL: newsURL,
            userId: parseInt(userId),
            date: Date().split(" ").splice(0, 4).join(" ")
        }
        // Add news to API and re-load news list
        API.POST("news", newNewsObject)
            .then(createNews)
    }
}

// Delete News Button
const DeleteNews = (userId) => {
    // Find ID of news item to remove
    let idToDelete = event.target.id.split("--")[1]
    let stringToDelete = `news/${idToDelete}`
    // Delete from API
    API.DELETE(stringToDelete)
        // Re-load news list
        .then(response => {
            createNews()
        })
}

// Update News Button
const UpdateNews = (userId) => {

}


const newsEventListener = () => {
    document.querySelector("#news").addEventListener("click", (event) => {

        let userId = document.querySelector("#userId").value
        let buttonParent = event.target.parentElement

        if (event.target.id === "addNews") {
            let newsFormHTML = newsForm()
            printToDom(newsFormHTML, "#newsFormSection")

        } else if (event.target.id === "submitNews") {
            SubmitNews(userId)

            // Edit and Delete buttons only work for news posted by active user
        } else if (event.target.id.startsWith("deleteNews") && buttonParent.classList.contains(`user--${userId}`)) {
            DeleteNews(userId)

        } else if (event.target.id.startsWith("editNewsButton") && buttonParent.classList.contains(`user--${userId}`)) {
            // Find ID of news item to edit
            let idToEdit = event.target.id.split("--")[1]
            // Show edit form
            let editFormHTML = editNewsForm(idToEdit)
            printToDom(editFormHTML, "#newsFormSection")

            // UPDATE button
            document.querySelector("#updateNews").addEventListener("click", () => {
                let news = document.querySelector("#editNewsTitle").value
                let newsSynopsis = document.querySelector("#editNewsSynopsis").value
                let newsURL = document.querySelector(`#newsLink--${idToEdit}`).href

                let updatedNewsObject = {
                    news: news,
                    newsSynopsis: newsSynopsis,
                    newsURL: newsURL,
                    userId: parseInt(userId),
                    date: Date().split(" ").splice(0, 4).join(" ")
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