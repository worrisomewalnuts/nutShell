// import printToDOM from "../utilities/printToDOM"
// import API from "../utilities/apiManager"

// function searchUsers(input) {
//     let userId = document.querySelector("#userId").value
//     let users = []
//     let friendsIds = []
//     let notFriends = []

//     document.querySelector("#userSearchResults").innerHTML = ""
//     return API.GET("users")
//         .then((parsedUsers) => {
//             users = parsedUsers
//             return API.GET(`users/${userId}/?_embed=friendships`)
//         })
//         .then((parsedFriendData) => {
//             friendsIds = parsedFriendData.friendships.map((friendship) => friendship.friendId)
//         })
//         .then(() => {
//             console.log({users})
//             console.log({friendsIds})
//             notFriends = users.map((user) => {
//                 if(friendsIds.includes(user.id) === false && user.id !== userId) {
//                     return user
//                 }
//             }).filter(element => element !== undefined)
//             console.log(notFriends)
//         })
// }

// export default searchUsers