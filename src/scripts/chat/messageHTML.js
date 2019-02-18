import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager";

function messageHTML(parsedMessages) {
    let messageHTML = ""
    let userArray = []
    let currentUserId = parseInt(document.querySelector("#userId").value)
    return API.GET("users")
        .then((parsedUsers) => userArray = parsedUsers)
        .then((userArray) => {
            let messagesWithFriendNames = parsedMessages.map((message) => {
                message.userId = userArray.filter((user) => {
                    if (user.id === message.userId) {
                        return user
                    }
                })
                return message
            })
            return messagesWithFriendNames
        })
        .then((messagesWithFriendNames) => {
            messagesWithFriendNames.forEach((message) => {
                if (currentUserId === message.userId[0].id) {
                    messageHTML +=`
                    <section id="message--${message.id}">
                        <h3 id="messageHeader--${message.id}">You posted at ${message.messageDateTime}</h3>
                        <div id="messageText--${message.id}">${message.messageText}</div>
                        <button id="edit--${message.id}">Edit Post</button>
                        <button id="delete--${message.id}">Delete Post</button>
                    </section>
                    `
                } else {
                    messageHTML += `
                    <section id="message--${message.id}">
                        <h3 id="messageHeader--${message.id}">Message from ${message.userId[0].userName} at ${message.messageDateTime}</h3>
                        <div id="messageText--${message.id}">${message.messageText}</div>
                    </section>
                    `
                }
            })
            printToDom(messageHTML, "#postedChatMessages")
        })
}

export default messageHTML