import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM";
import createFriends from "./createFriends";

// allows the logged in user to type a string into the search field, and returns a list of users that the current user is NOT already friends with, if those usernames contain the input search string
function searchUsers(input) {
    let userId = document.querySelector("#userId").value
    // all users
    let users = []
    // ids of friends of the logged in user
    let friendsIds = []
    // a list of all users that the logged in user is not friends with
    let notFriends = []
    // a subset of notFriends that also have usernames that contain the input search string
    let notFriendsThatMatchSearch = []
    document.querySelector("#userSearchResults").innerHTML = ""
    return API.GET("users")
    // gets all users from the database users array
        .then((parsedUsers) => {
            users = parsedUsers
            return API.GET(`users/${userId}/?_embed=friendships`)
        })
        // makes an array of friend ids
        .then((parsedFriendData) => {
            friendsIds = parsedFriendData.friendships.map((friendship) => friendship.friendId)
        })
        // generates a list of nutshell users that the logged in user is not friends with
        .then(() => {
            notFriends = users.map((user) => {
                if(friendsIds.includes(user.id) === false && user.id !== parseInt(userId)) {
                    return user
                }
            }).filter(element => element !== undefined)
            return notFriends
        })
        // checks to see which "notFriends" have a username that matches the search string
        .then((notFriends) => {
            return notFriendsThatMatchSearch = notFriends.filter(user => user.userName.toLowerCase().includes(input.toLowerCase()))
        })
        // generates a list of potential users that match the search, along with a follow button next to each username
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
        // adds an event listener to follow buttons to allow the logged in user to follow new users
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