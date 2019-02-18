import printToDOM from "../utilities/printToDOM"
import populateChat from "./populateChat"
const makeChatHTML = (userId) => {
    const html = ` <article>
            <img></img>
            <input id = "userId" type = "Hidden" value = ${userId}>
            <section id="postedChatMessages"></section>
            <section id="newMessageForm">
                <textarea id="newMessageText">Enter Message Here (max 160 characters)</textarea>​
                <span id="remainingChar"></span>
                <button id="submitMessage">Submit Message</button>
            </section>
        </article>`

    printToDOM(html, ".output")
    let bigButton = document.querySelector("#bigButtonSection")
    bigButton.classList.toggle("inProfile")
    bigButton.classList.toggle("inChat")
    populateChat();
}
export default makeChatHTML