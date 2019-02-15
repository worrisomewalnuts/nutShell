import printToDom from "../utilities/printToDOM"

function messageHTML(parsedMessages) {
    let messageHTML = ""
    parsedMessages.forEach((message) => {
        messageHTML += `
        <section id="message--${message.id}">
        <h3 id="messageHeader--${message.id}">Message from ${message.userId} at ${message.messageDateTime}</h3>
        <div id="messageText--${message.id}">${message.messageText}</div>
        </section>
        `
    })
    printToDom(messageHTML, "#postedChatMessages")
}

export default messageHTML