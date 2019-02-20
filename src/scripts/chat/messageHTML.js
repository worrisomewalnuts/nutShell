import printToDom from "../utilities/printToDOM"
import API from "../utilities/apiManager";
import populateChat from "./populateChat";

function messageHTML(parsedMessages) {
    // clones the chat article node to prevent button event listeners from firing more than one time
    let oldElement = document.querySelector("#chatArticle")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    // creates empty HTML String
    let messageHTML = ""
    // takes the messages and users arrays and combines them so the user's username can be accessed in the display instead of their user id.
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
        // creates an HTML block for each message in the database. if the message is created by the logged in user, then edit and delete buttons are provided for each of their messages.
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
            // prints all of the message HTML blocks
            printToDom(messageHTML, "#postedChatMessages")
            
            // maximum vertical scroll
            let scrollBottom = document.querySelector("#chatArticle").scrollHeight - document.querySelector("#chatArticle").clientHeight
            // Set vertical scroller to bottom
            document.querySelector("#chatArticle").scrollTop = scrollBottom
        })

        // adds event listeners to all buttons
        .then(() => {
            document.querySelector("#chatArticle").addEventListener("click", () => {
                // lets user submit a new message to the database with the content in the text area. Afterwards it refreshes the chat display to show the new message.
                if (event.target.id === "submitMessage") {
                    let messageObj = {}
                    messageObj.userId = parseInt(document.querySelector("#userId").value)
                    messageObj.messageText = document.querySelector("#newMessageText").value
                    messageObj.messageDateTime = Date().split(" ").splice(0, 5).join(" ")
                    return API.POST("chatMessages", messageObj)
                        .then(() => populateChat())
                        .then(() => {
                            document.querySelector("#newMessageText").value = ""
                        })
                    // takes the message that had it's edit button clicked on and placed the message contentinto the text area. Message Id and dateTime stamp are stored in hidden values. Submit button is converted to an Update Button
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
                    // Update button replaces the message in the database with the current information. Transforms update button back to submit button and resets the text area.
                } else if (event.target.id === "updateMessage") {
                    let messageObj = {}
                    messageObj.id = parseInt(document.querySelector("#messageToEditId").value)
                    document.querySelector("#messageToEditId").value = ""
                    messageObj.messageDateTime = document.querySelector("#messageToEditDateTime").value
                    document.querySelector("#messageToEditDateTime").value - ""
                    messageObj.messageText = document.querySelector("#newMessageText").value
                    messageObj.userId = parseInt(document.querySelector("#userId").value)
                    return API.EDIT(`chatMessages/${messageObj.id}`, messageObj)
                        .then(() => populateChat())
                        .then(() => {
                            document.querySelector("#updateMessage").id = "submitMessage"
                            document.querySelector("#submitMessage").innerText = "Submit Message"
                            document.querySelector("#newMessageText").value = ""
                            return
                        })
                }
                // deletes the selected message from the database.
                else if (event.target.id.startsWith("delete--")) {
                    let id = parseInt(event.target.id.split("--")[1])
                    return API.DELETE(`chatMessages/${id}`)
                        .then(() => populateChat())
                        .then(() => {
                            document.querySelector("#newMessageText").value = ""
                        })
                }
            })
        })
}

export default messageHTML