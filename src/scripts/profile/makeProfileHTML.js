import printToDOM from "../utilities/printToDOM"
import populateProfile from "./populateProfile"
import logout from "./logout";
import navbar from "./navBar";

const makeProfileHTML = (userId) => {

    const html = `
    <article>
    <div id = "header">
            <img id = "image"></img>
            <input id = "userId" type = "Hidden" value = ${userId}>
            <section id = "title"> NutShell
            </section>
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
    if (bigButton.classList.contains("inChat")) {
        bigButton.classList.toggle("inChat")
        bigButton.classList.toggle("inProfile")
    }
    if (bigButton.classList.contains("hidden")) {
        bigButton.classList.toggle("hidden")
        bigButton.classList.toggle("visible")
        bigButton.classList.toggle("login")
        bigButton.classList.toggle("inProfile")
    }
    //EL on logout link
    logout()
    navbar()
    populateProfile();
}
export default makeProfileHTML