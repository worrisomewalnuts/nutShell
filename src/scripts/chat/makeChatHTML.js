import printToDOM from "../utilities/printToDOM"
import populateChat from "./populateChat"
const makeChatHTML = (userId) => {
    const html = ` <article>
            <img></img>
            <input id = "userId" type = "Hidden" value = ${userId}>
            <div>THIS IS THE CHAT AND USER ${userId} IS LOGGED IN</div>
        </article>`

    printToDOM(html, ".output")
    let bigButton = document.querySelector("#bigButtonSection")
    bigButton.classList.toggle("inProfile")
    bigButton.classList.toggle("inChat")
    populateChat();
}
export default makeChatHTML