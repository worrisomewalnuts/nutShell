import newsForm from "./newsForm"
import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager";
import createNews from "./createNews";

const newsEventListener = () => {
    document.querySelector("#news").addEventListener("click", (event) => {
        if (event.target.id === "addNews") {                        // ADD NEWS ITEM button
            let newsFormHTML = newsForm()
            printToDom(newsFormHTML, "#newsFormSection")

        } else if (event.target.id === "submitNews") {              // SUBMIT button


        } else if (event.target.id.startsWith("deleteNews")) {       // DELETE button
            // Find ID of news item to remove
            let idToDelete = event.target.id.split("--")[1]
            let stringToDelete = `news/${idToDelete}`
            // Delete from API
            API.DELETE(stringToDelete)
                // Re-load news list
                .then(response => {
                    createNews()
                })

        // } else if (event.target.id.startsWith("editNews") {          // EDIT button

        }
    })
}

export default newsEventListener