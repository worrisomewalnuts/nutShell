import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM"
import newsHTML from "../profile/newsHTML"
import newsEventListener from "./newsEventListener"

const createNews = () => {
    // Get news objects from API
    API.GET("users?_embed=friendships&_embed=news")
        .then((userArray) => {
            // Get user IDs for active user and all their friends
            let activeUser = parseInt(document.querySelector("#userId").value)
            let idsToFind = []

            userArray.forEach (user => {
                if (activeUser === user.id) {
                    idsToFind.push(activeUser)
                    let userFriends = user.friendships
                    userFriends.forEach(friend => {
                        idsToFind.push(friend.friendId)
                    })
                }
            })
            return idsToFind
            // Get all news items for active user and their friends
        }).then(idsToFind => {
            let newsSearchString = `news?_expand=user&userId=${idsToFind.join("&userId=")}`
            API.GET(newsSearchString)
                .then(newsArray => {
                    // Sort news by date
                    let sortedNewsArray = newsArray.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date)
                    })
                    return sortedNewsArray
                }).then(sortedNewsArray => {
                    // Create HTML representation of news items
                    let newsToPrint = ""
                    sortedNewsArray.forEach(newsObject => {
                        let newsItemHTML = newsHTML(newsObject)
                        newsToPrint += `${newsItemHTML}`
                    })
                    // newsToPrint += "<button id='addNews'>Add News Item</button>"
                        // Print HTML news to DOM
                        printToDom(newsToPrint, "#newsListSection")

                }).then(() => {
                    // Add class of friendItem to news not posted by active user
                    let activeUser = parseInt(document.querySelector("#userId").value)
                    let newsItems = document.querySelectorAll(".newsItem")
                    newsItems.forEach(childEl => {
                        if (childEl.classList.contains(`user--${activeUser}`)) {
                            childEl.classList.remove("friendItem")
                        }
                    })
                })
            })
            // Add event listener on #news (bubbles!!)
            let oldElement = document.querySelector("#news")
            let newElement = oldElement.cloneNode(true)
            oldElement.parentNode.replaceChild(newElement, oldElement)
            newsEventListener()
        }



export default createNews