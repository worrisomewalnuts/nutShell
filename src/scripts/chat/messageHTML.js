import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager";
import populateChat from "./populateChat";
import makeChatHTML from "./makeChatHTML"

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
                if (id === message.userId[0].id) {
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
                        .then(() => populateChat())
                } else if (event.target.id.startsWith("edit--")) {
                    let id = parseInt(event.target.id.split("--")[1])
                    let fetchString = `chatMessages/${id}`
                    return API.GET(fetchString)
                        .then((parsedMessage) => {
                            document.querySelector("#newMessageText").value = parsedMessage.messageText
                            document.querySelector("#submitMessage").id = "updateMessage"
                            document.querySelector("#updateMessage").innerText = "Update Message"
                            document.querySelector("#messageToEditId").value = parsedMessage.id
                            document.querySelector("#messageToEditDateTime").value = parsedMessage.messageDateTime
                        })
                } else if (event.target.id === "updateMessage") {
                    let messageObj = {}
                    messageObj.id = parseInt(document.querySelector("#messageToEditId").value)
                    document.querySelector("#messageToEditId").value = ""
                    messageObj.messageDateTime = document.querySelector("#messageToEditDateTime").value
                    document.querySelector("#messageToEditDateTime").value - ""
                    messageObj.messageText = document.querySelector("#newMessageText").value
                    messageObj.userId = parseInt(document.querySelector("#userId").value)
                    return API.EDIT(`chatMessages/${messageObj.id}`, messageObj)
                    .then(()=> populateChat())
                    .then(()=> {
                        document.querySelector("#updateMessage").id = "submitMessage"
                        document.querySelector("#submitMessage").innerText = "Submit Message"
                        document.querySelector("#newMessageText").value = "Enter Message Here"
                        return
                    })
                }

                else if (event.target.id.startsWith("delete--")) {
                    let id = parseInt(event.target.id.split("--")[1])




                }
            })
        })
}

export default messageHTML