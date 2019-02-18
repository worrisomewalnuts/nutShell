import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager";

function messageHTML(parsedMessages) {
    let messageHTML = ""
    let userArray = []
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
                let dateTime = Date(message.dateTime).split(" ").splice(0, 5).join(" ")
                messageHTML += `
                <section id="message--${message.id}">
                    <h3 id="messageHeader--${message.id}">Message from ${message.userId[0].userName} at ${dateTime}</h3>
                    <div id="messageText--${message.id}">${message.messageText}</div>
                </section>
                `
            })
            printToDom(messageHTML, "#postedChatMessages")
        })
}

export default messageHTML