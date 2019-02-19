import printToDOM from "../utilities/printToDOM"
import populateProfile from "./populateProfile"
import logout from "./logout";
import navbar from "./navBar";

const makeProfileHTML = (userId) => {

    const html = `
    <article>
    <div id = "header">
        <section id="bigButtonSection" class="inProfile">
            <button id="bigButton">BIG BUTTON</button>
        </section>
        <input id = "userId" type = "Hidden" value = ${userId}>
        <section id = "title"> NutShell</section>
        <a href="" id = "logout"> LOGOUT </a>
    </div>
    <div id="navBar">

    </div>
    <div id = "bigContainer">
            <section id = "friends">
            </section>
        <div id = "tabContainer">

        </div>
    </div>
            <section id = "chats">
            </section>
        </article>`

    printToDOM(html, ".output")
    let bigButton = document.querySelector("#bigButtonSection")
    document.querySelector("#bigButton").textContent = "CHAT"

    //EL on logout link
    logout()
    navbar()
    populateProfile();
}
export default makeProfileHTML