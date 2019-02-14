import printToDOM from "../utilities/printToDOM"
import populateProfile from "./populateProfile"
const makeProfileHTML = (userId) => {
    const html = ` <article>
            <img></img>
            <input id = "userId" type = "Hidden" value = ${userId}>
            <section id = "title"> NutShell
            </section>

            <h1>Friends</h1>
            <section id = "friends">
            </section>

            <h1>News</h1>
            <section id = "news">
                <section id="newsListSection"></section>
                <section id="newsFormSection"></section>
            </section>

            <h1>Events</h1>
            <section id = "events">
            </section>

            <h1>Tasks</h1>
            <section id = "tasks">
            </section>

            <section id = "chats">
            </section>
        </article>`

    printToDOM(html, ".output")
    populateProfile();
}
export default makeProfileHTML