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
                    // Create HTML representation of news items
                    let newsToPrint = ""
                    newsArray.forEach(newsObject => {
                        let newsItemHTML = newsHTML(newsObject)
                        newsToPrint += `${newsItemHTML}`
                    })
                    newsToPrint += "<button id='addNews'>Add News Item</button>"
                        // Print HTML news to DOM
                        printToDom(newsToPrint, "#newsListSection")
                    })
            })
            // Add event listener on #news (bubbles!!)
            newsEventListener()
        }



export default createNews






// // Check IF userId on news objects matches active user OR active user's friends
// let activeUserId = parseInt(document.querySelector("#userId").value)
// let idsToFind = []

// idsToFind.push(activeUserId)

// let userFriendships = 



// userArray.forEach (user => {
//     if (activeUserId === user.id) {
//         let userName = user.userName
//         let newsArray = user.news
//         // Turn each matching news object into HTML
//         newsArray.forEach(newsObject => {
//             let newsItemHTML = newsHTML(newsObject, userName) + "<button id='addNews'>Add News Item</button>"
//             // Print HTML news to DOM
//             printToDom(newsItemHTML, "#newsListSection")
//         })
//     }
// })





// })