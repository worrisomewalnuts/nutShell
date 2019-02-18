import printToDOM from "../utilities/printToDOM"
import populateChat from "./populateChat"
const makeChatHTML = (userId) => {
    const html = ` <article id="chatArticle">
            <img></img>
            <input id="userId" type="Hidden" value=${userId}>
            <section id="postedChatMessages"></section>
            <section id="newMessageForm">
                <input id="messageToEditId" type="Hidden">
                <input id="messageToEditDateTime" type="Hidden">
                <textarea id="newMessageText" rows="10" cols="30">Enter Message Here</textarea>​
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