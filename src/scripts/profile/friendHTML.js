import printToDom from "../utilities/printToDOM";
import API from "../utilities/apiManager";
import createPrivateMessages from "../privateMessages/createPrivateMessages";
import messagesEL from "./messagesEL";


// creates a list of users that the logged in user follows, and provides buttons to unfollow/unfriend any "friended" users
function friendHTML(friendList) {
    // gets friendship database array to use for direct message buttons
    return API.GET("friendships")
    // checks all of the users friends, and sees if there is a friendship in the friendships array that has the users id and the friends id reversed to see that the friend has also friended the user
        .then((parsedFriendships) => {
            let userId = parseInt(document.querySelector("#userId").value)
            let reciprocatedFriendships = friendList.map((friend) => {
                let goodFriend = parsedFriendships.filter((friendship) => {
                    if (friend[0].id === friendship.userId && userId === friendship.friendId) {
                        return friendship
                    }
                })
                // prevents an error in the event the reciprocated friendship does not exist, returns undefined instead
                if (goodFriend.length !== 0) {
                    return goodFriend[0].userId
                }
            })
            return reciprocatedFriendships
        })
        .then((reciprocatedFriendships) => {
            let friendHTML = `
            <fieldset id="searchUsers">
                <label for="searchUsersInput" class="searchUsersInput">Search For New Users To Follow</label>
                <input type="text" name="searchUsersInput" id="searchUsersInput">
                <button id="userSearchButton">Search For Users</button>
                <section id="userSearchResults"></section>
            </fieldset>
            <h1 id='FriendList'>Friends</h1>
            `
            friendList = friendList.sort((a, b) => {
                return a[0].userName.localeCompare(b[0].userName);
            })
            friendList.map((friendObj) => {
                let currentHTML = `
                <section id="friend--${friendObj[0].id}"
                <div id="#${friendObj[0].id}">${friendObj[0].userName}</div>
                <button id="delete--${friendObj[0].id}">Unfollow</button>
                `
                // <button id="message--${friendObj[0].id}">Message</button>
                if(reciprocatedFriendships.includes(friendObj[0].id)) {
                    currentHTML += `
                    <button id="message--${friendObj[0].id}">Direct Message</button>
                    `
                }
                return friendHTML += currentHTML
            })
            printToDom(friendHTML, "#friends")
            return
        })
        .then(() => {
            document.querySelector("#friends").addEventListener("click", () => {
                if (event.target.id.startsWith("message--")) {
                    let id = event.target.id.split("--")[1]
                    createPrivateMessages(id)
                    messagesEL()
                }
            })
        })
}

export default friendHTML