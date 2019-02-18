import printToDOM from "../utilities/printToDOM"
import populateChat from "./populateChat"
const makeChatHTML = (userId) => {
    // creates base chat HTML with two hidden inputs in the new message form to store message ID and text content for messages being edited
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
    // Sets bigButton so that it will take the user back to the profile when clicked
    let bigButton = document.querySelector("#bigButtonSection")
    bigButton.classList.toggle("inProfile")
    bigButton.classList.toggle("inChat")
    
    populateChat();
}
export default makeChatHTML