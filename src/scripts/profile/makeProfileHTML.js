import printToDOM from "../utilities/printToDOM"
import populateProfile from "./populateProfile"
const makeProfileHTML = (userId) => {
    const html = ` <article>
            <img></img>
            <input id = "userId" type = "Hidden" value = ${userId}>
            <section id = "title"> NutShell
            </section>
            <section id = "friends">
            </section>
            <section id = "news">
            </section>
            <section id = "events">
            </section>
            <section id = "tasks">
            </section>
            <section id = "chats">
            </section>
        </article>`

    printToDOM(html, ".output")
    populateProfile();
}

export default makeProfileHTML