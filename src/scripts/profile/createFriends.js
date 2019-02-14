import API from "../utilities/apiManager"
import friendHTML from "./friendHTML"
import searchUsers from "./searchUsers";

function createFriends() {
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
}

export default createFriends