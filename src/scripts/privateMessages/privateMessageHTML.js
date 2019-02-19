import printToDom from "../utilities/printToDOM";

function privateMessageHTML(messagesInThisConversation) {
    let userId = parseInt(document.querySelector("#userId").value)
    let HTMLString = ""
    messagesInThisConversation.forEach(message => {
        if (message.senderId === userId) {
            HTMLString += `
            <section id="message-${message.id}">
                <h3 id="messageHeader--${message.id}">You posted at ${message.messageDateTime}</h3>
                <div id="messageText--${message.id}">${message.messageText}</div>
            </section>
            `
        } else {
            HTMLString += `
            <section id="message-${message.id}">
                <h3 id="messageHeader--${message.id}">They posted at ${message.messageDateTime}</h3>
                <div id="messageText--${message.id}">${message.messageText}</div>
            </section>
            `
        }
    })
    HTMLString += `
    <section id="newMessageForm">
        <textarea id="newMessageText" rows="10" cols="30" placeholder="Enter Message Here"></textarea>​
        <button id="submitMessage">Send Message</button>
    </section>
    `
// PRINT TO DOM NOW!!!!!!!!!!
    printToDom(HTMLString,"#tabContainer")
}

export default privateMessageHTML