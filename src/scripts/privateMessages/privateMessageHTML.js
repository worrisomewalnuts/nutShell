import printToDom from "../utilities/printToDOM";
import API from "../utilities/apiManager";
import createPrivateMessages from "./createPrivateMessages";


function privateMessageHTML(messagesInThisConversation, friendId) {
    let oldElement = document.querySelector("#tabContainer")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    let id = parseInt(friendId)
    let userId = parseInt(document.querySelector("#userId").value)
    let HTMLString = `
    <input id="friendId" type="Hidden" value=${id}>
    `
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
    printToDom(HTMLString, "#tabContainer")

    // maximum vertical scroll
    let scrollBottom = document.querySelector("#tabContainer").scrollHeight - document.querySelector("#tabContainer").clientHeight
    // Set vertical scroller to bottom
    document.querySelector("#tabContainer").scrollTop = scrollBottom

    document.querySelector("#tabContainer").addEventListener("click", () => {
        if (event.target.id === "submitMessage") {
            let obj = {}
            obj.recipientId = id
            obj.senderId = userId
            obj.messageDateTime = Date().split(" ").splice(0, 5).join(" ")
            obj.messageText = document.querySelector("#newMessageText").value
            return API.POST("privateMessages", obj)
                .then(() => {
                    let newCount = parseInt(localStorage.getItem("count")) + 1
                    localStorage.setItem("count", newCount)
                    localStorage.setItem("senderId", obj.senderId)
                    localStorage.setItem("recipientId", obj.recipientId)
                    createPrivateMessages(id)
                })
        }
    })
}

export default privateMessageHTML