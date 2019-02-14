import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM";
import createFriends from "./createFriends";

function searchUsers(input) {
    let userId = document.querySelector("#userId").value
    let users = []
    let friendsIds = []
    let notFriends = []
    let notFriendsThatMatchSearch = []
    document.querySelector("#userSearchResults").innerHTML = ""
    return API.GET("users")
        .then((parsedUsers) => {
            users = parsedUsers
            return API.GET(`users/${userId}/?_embed=friendships`)
        })
        .then((parsedFriendData) => {
            friendsIds = parsedFriendData.friendships.map((friendship) => friendship.friendId)
        })
        .then(() => {
            notFriends = users.map((user) => {
                if(friendsIds.includes(user.id) === false && user.id !== parseInt(userId)) {
                    return user
                }
            }).filter(element => element !== undefined)
            return notFriends
        })
        .then((notFriends) => {
            return notFriendsThatMatchSearch = notFriends.filter(user => user.userName.includes(input))
        })
        .then((notFriendsThatMatchSearch)=> {
            let userSearchResultsHTML = `
            <div>Usernames that match Your Search:</div>
            `
            notFriendsThatMatchSearch.forEach((user) => {
                userSearchResultsHTML += `
                <section id="result--${user.id}">
                    <div id="name--${user.id}">${user.userName}</div>
                    <button id="follow--${user.id}">Follow</button>
                </section>
                `
            })
            printToDom(userSearchResultsHTML, "#userSearchResults")
        })
        .then(() => {
            document.querySelector("#friends").addEventListener("click", (event) => {
                if (event.target.id.startsWith("follow--")) {
                    let newFriendship = {}
                    newFriendship.userId = parseInt(userId)
                    newFriendship.friendId = parseInt(event.target.id.split("--")[1])
                    return API.POST("friendships", newFriendship)
                    .then(() => {
                        createFriends()
                    })
                } 
            })
        })

}

export default searchUsers