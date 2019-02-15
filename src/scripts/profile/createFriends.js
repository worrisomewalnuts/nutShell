import API from "../utilities/apiManager"
import friendHTML from "./friendHTML"
import searchUsers from "./searchUsers";

function createFriends() {
    let oldElement = document.querySelector("#friends")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    let userId = document.querySelector("#userId").value
    let friendArray = []
    let userArray = []
    let friendList = []
    API.GET(`users/${userId}/?_embed=friendships`)
        .then((parsedFriendData) => {
            friendArray = parsedFriendData.friendships.map((friendship) => friendship.friendId)
            return API.GET("users")
        })
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
            document.querySelector("#userSearchButton").addEventListener("click", () => {
                let input = document.querySelector("#searchUsersInput").value
                searchUsers(input)
            })
        })
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