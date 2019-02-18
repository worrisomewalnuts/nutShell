import printToDom from "../utilities/printToDOM";

// creates a list of users that the logged in user follows, and provides buttons to unfollow/unfriend any "friended" users
function friendHTML(friendList) {
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
        <button id="message--${friendObj[0].id}">Message</button>
        `
        return friendHTML += currentHTML
    })
    printToDom(friendHTML, "#friends")
    return
}

export default friendHTML