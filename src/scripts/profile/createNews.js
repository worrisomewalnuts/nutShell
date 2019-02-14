import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM"
import newsHTML from "../profile/newsHTML"
import newsForm from "./newsForm";

const createNews = () => {
    // Get news objects from API
    API.GET("users?_embed=friendships&_embed=news")
        .then((userArray) => {
            // Check IF userId on news objects matches active user
            let activeUser = parseInt(document.querySelector("#userId").value)
            userArray.forEach (user => {
                if (activeUser === user.id) {
                    let userName = user.userName
                    let newsArray = user.news
                    // Turn each matching news object into HTML
                    newsArray.forEach(newsObject => {
                        let newsItemHTML = newsHTML(newsObject, userName) + "<button id='addNews'>Add News Item</button>"
                        // Print HTML news to DOM
                        printToDom(newsItemHTML, "#news")
                    })
                }
            })
        })

        // Add event listener on #news (bubbles!!)
        document.querySelector("#news").addEventListener("click", (event) => {
            if (event.target.id === "addNews") {
                let newsFormHTML = newsForm()
                let newsSection = document.querySelector("#news")
                printToDom(newsFormHTML, "#news")
            }
        })
}




export default createNews