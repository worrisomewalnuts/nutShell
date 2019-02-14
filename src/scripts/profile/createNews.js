import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM"
import newsHTML from "../profile/newsHTML"

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
                    let newsItemHTML = newsHTML(newsObject, userName)
                    // Print HTML news to DOM
                    printToDom(newsItemHTML, "#news")
                })
            }
        })
    })
}



export default createNews




// Check IF userId on news objects matches friend of active user
// let friendsArray = user.friendships
// let friendIds = []
// friendsArray.forEach(friend => {
//     friendIds.push(friend.friendId)
//     console.log(friendIds)
// })
// friendIds.forEach(friendId => {
//     if (friendId === user.id) {
//         let userName = user.userName
//         let newsArray = user.news
//         console.log(newsArray)
//         // Turn each matching news object into HTML
//         newsArray.forEach(newsObject => {
//             let newsItemHTML = newsHTML(newsObject, userName)
//             // Print HTML news to DOM
//             printToDom(newsItemHTML, "#news")
//         })
// }