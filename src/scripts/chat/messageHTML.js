import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager";
import populateChat from "./populateChat";

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
            let id = parseInt(document.querySelector("#userId").value)
            messagesWithFriendNames.forEach((message) => {
                if(id === message.userId[0].id) {
                    messageHTML += `
                    <section id="message--${message.id}">
                        <h3 id="messageHeader--${message.id}">You Posted at ${message.messageDateTime}</h3>
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
        .then(() => {
            document.querySelector("#chatArticle").addEventListener("click", () => {
                if (event.target.id === "submitMessage") {
                    let messageObj = {}
                    messageObj.userId = parseInt(document.querySelector("#userId").value)
                    messageObj.messageText = document.querySelector("#newMessageText").value
                    messageObj.messageDateTime = Date().split(" ").splice(0, 5).join(" ")
                    return API.POST("chatMessages", messageObj)
                    .then(()=> populateChat())
                } else if (event.target.id.startsWith("edit--")) {
                    let id = parseInt(event.target.id.split("--")[1])
                    console.log(`IM GOING TO EDIT ${id}`)

                } else if (event.target.id.startsWith("delete--")) {
                    let id = parseInt(event.target.id.split("--")[1])
                    console.log(`IM GOING TO DELETE ${id}`)
                }
            })
        })
}

export default messageHTML