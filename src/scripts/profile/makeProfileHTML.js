import printToDOM for "./printToDOM"

const makeProfileHTML = () => {
        html = ` <article>
            <img></img>
            <section id="title"> NutShell
            </section>
            <section id = "friends"></section>
            <section id = "news"></section>
            <section id = "events"></section>
            <section id = "tasks"></section>
            <section id = "chats"></section>
        </article>`
        printToDOM(html, ".container")
    }

export default makeProfileHTML