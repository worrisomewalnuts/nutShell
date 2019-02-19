import printToDOM from "../utilities/printToDOM"
import populateProfile from "./populateProfile"
import logout from "./logout";
import navbar from "./navBar";

const makeProfileHTML = (userId) => {

    const html = `
    <article>
    <div id = "header">
        <section id="bigButtonSection" class="hidden login">
            <button id="bigButton" class="acorn">BIG BUTTON</button>
        </section>
        <input id = "userId" type = "Hidden" value = ${userId}>
        <section id = "title"> NutShell</section>
        <a href="" id = "logout" class="acorn"> LOGOUT </a>
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
    if (bigButton.classList.contains("inChat")) {
        bigButton.classList.toggle("inChat")
        bigButton.classList.toggle("inProfile")
        document.querySelector("#bigButton").textContent = "CHAT"
    }
    if (bigButton.classList.contains("hidden")) {
        bigButton.classList.toggle("hidden")
        bigButton.classList.toggle("visible")
        bigButton.classList.toggle("login")
        bigButton.classList.toggle("inProfile")
        document.querySelector("#bigButton").textContent = "CHAT"
    }
    //EL on logout link
    logout()
    navbar()
    populateProfile();
}
export default makeProfileHTML