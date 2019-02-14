import printToDom from "../utilities/printToDOM";

function friendHTML(friendList) {
    let friendHTML = `
    <fieldset id="searchUsers">
        <label for="searchUsersInput" class="searchUsersInput">Search For New Users To Follow</label>
        <input type="text" name="searchUsersInput" id="searchUsersInput">
        <section id="userSearchResults"></section>
    </fieldset>
    <h1 id='FriendList'>Friends</h1>
    `
    friendList.map((friendObj) => {
        let currentHTML = `
        <section id="friend--${friendObj[0].id}"
        <div id="#${friendObj[0].id}">${friendObj[0].userName}</div>
        <button id="delete--${friendObj[0].id}">Unfollow</button>
        `
        return friendHTML += currentHTML
    })
    printToDom(friendHTML,"#friends")
}

export default friendHTML