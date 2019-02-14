import printToDOM for "./printToDOM"

const makeProfileHTML = (userId) => {
        html = ` <article>
            <img></img>
            <input id = "userId" type = "Hidden" value = ${usedId}>
            <section id = "title"> NutShell
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