import printToDOM from "../utilities/printToDOM"
import populateChat from "./populateChat"
const makeChatHTML = (userId) => {
    // creates base chat HTML with two hidden inputs in the new message form to store message ID and text content for messages being edited
    const html = `
    <div id = "header">
        <section id="bigButtonSection" class="visible inChat">
            <button id="bigButton">BIG BUTTON</button>
        </section>
        <input id = "userId" type = "Hidden" value = ${userId}>
        <section id = "title"> NutShell</section>
        <a href="" id = "logout"> LOGOUT </a>
    </div>

    <article id="chatArticle">
            <img></img>
            <input id="userId" type="Hidden" value=${userId}>
            <section id="postedChatMessages"></section>
            <section id="newMessageForm">
                <input id="messageToEditId" type="Hidden">
                <input id="messageToEditDateTime" type="Hidden">
                <textarea id="newMessageText" rows="10" cols="30" placeholder="Enter Message Here"></textarea>​
                <button id="submitMessage">Submit Message</button>
            </section>
        </article>`

    printToDOM(html, ".output")
    // Sets bigButton so that it will take the user back to the profile when clicked
    let bigButton = document.querySelector("#bigButtonSection")
    bigButton.classList.toggle("inProfile")
    bigButton.classList.toggle("inChat")
    document.querySelector("#bigButton").textContent = "PROFILE"

    populateChat();
}
export default makeChatHTML