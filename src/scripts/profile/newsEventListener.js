import newsForm from "./newsForm"
import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager"
import createNews from "./createNews"
import editNewsForm from "./editNewsForm"
import { isEmpty, isProfanity } from "../utilities/dataValidation"

const $ = document.querySelector.bind(document)

const newsEventListener = () => {
    document.querySelector("#news").addEventListener("click", (event) => {
        let userId = document.querySelector("#userId").value
        let buttonParent = event.target.parentElement

        // ADD NEWS ITEM button
        if (event.target.id === "addNews") {
            let newsFormHTML = newsForm()
            printToDom(newsFormHTML, "#newsFormSection")

            // SUBMIT button
        } else if (event.target.id === "submitNews") {
            let news = document.querySelector("#newsTitle").value
            let newsSynopsis = document.querySelector("#newsSynopsis").value
            let newsURL = document.querySelector("#newsURL").value

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

                API.POST("news", newNewsObject)
                    .then(createNews)
            }

            // DELETE button
        } else if (event.target.id.startsWith("deleteNews")) {

            // Check that news belongs to active user
            if (buttonParent.classList.contains(`user--${userId}`)) {
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

            // EDIT button
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


// // Add News Button
// $("#addNews").addEventListener("click", (event) => {
//     let newsFormHTML = newsForm()
//     printToDom(newsFormHTML, "#newsFormSection")
// })

// // Submit News Button
// $("#submitNews").addEventListener("click", (event) => {
//     let news = document.querySelector("#newsTitle").value
//     let newsSynopsis = document.querySelector("#newsSynopsis").value
//     let newsURL = document.querySelector("#newsURL").value

//     //run data validation and create new news if info is passed
//     if (isEmpty(news) || isEmpty(newsSynopsis) || isEmpty(newsURL)) {
//         alert("One or more fields are empty")
//     } else if (isProfanity(news) || isProfanity(newsSynopsis) || isProfanity(newsURL)) {
//         alert("One or more fields contain profanity")
//     } else {
//         let newNewsObject = {
//             news: news,
//             newsSynopsis: newsSynopsis,
//             newsURL: newsURL,
//             userId: parseInt(userId),
//             date: Date().split(" ").splice(0, 4).join(" ")
//         }

//         API.POST("news", newNewsObject)
//             .then(createNews)
//     }
// })




export default newsEventListener