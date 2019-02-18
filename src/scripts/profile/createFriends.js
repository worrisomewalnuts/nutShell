import API from "../utilities/apiManager"
import friendHTML from "./friendHTML"
import searchUsers from "./searchUsers";

function createFriends() {
    // clones the friends node to clear event listeners
    let oldElement = document.querySelector("#friends")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);

    let userId = document.querySelector("#userId").value
    // creates dummy arrays to store database information pulled from fetches
    let friendArray = []
    let userArray = []
    let friendList = []
    // pulls the database friendships array and stores it in the friendArray global variable
    API.GET(`users/${userId}/?_embed=friendships`)
        .then((parsedFriendData) => {
            friendArray = parsedFriendData.friendships.map((friendship) => friendship.friendId)
            return API.GET("users")
        })
        // pulls the database user array and stores it in the userArray global variable. uses the friendArray to replace user ids with usernames. Friendlist combines friendarray and user array.
        .then((parsedUserData) => {
            userArray = parsedUserData
            friendList = friendArray.map((friendId) => {
                return friendId = userArray.filter((user) => {
                    if (user.id === friendId) {
                        return user.userName
                    }
                })
            })
            return friendList
        })

        .then((friendList) => friendHTML(friendList))
        .then(() => {
            // allows user to type a string into the search box to searchfor matching friends
            document.querySelector("#userSearchButton").addEventListener("click", () => {
                let input = document.querySelector("#searchUsersInput").value
                searchUsers(input)
            })
        })
        // allows a user to unfriend/unfollow a "friended" user
        .then(() => {
            document.querySelector("#friends").addEventListener("click", (event) => {
                if (event.target.id.startsWith("delete--")) {
                    let friendId = parseInt(event.target.id.split("--")[1])
                    return API.GET("friendships")
                        .then((parsedFriendData) => {
                            let friendshipId = parsedFriendData.filter((friendship) => (friendship.userId === parseInt(userId) && friendship.friendId === friendId)
                            )[0].id
                            return friendshipId
                        })
                        .then((friendshipId) => API.DELETE(`friendships/${friendshipId}`))
                        .then(() => {
                            createFriends()
                        })
                }
            })
        })
}

export default createFriends