import printToDom from "../utilities/printToDOM";
import createNews from "./createNews";
import createEvents from "./createEvent";
import createTasks from "./createTasks";

const navBarhtml = () => {
    const html =
        `<a href="#" id="navNews">News</a>
            <a href="#" id="navEvents">Events</a>
            <a href="#" id="navTasks">Tasks</a>`
    printToDom(html, "#navBar")
}


const navbar = () => {
    navBarhtml()
    let html =
        `<h1>News</h1>
        <section id = "news">
        <section id="newsListSection"></section>
        <section id="newsFormSection"></section>
        </section>`
    printToDom(html, "#tabContainer")
    createNews()
    document.querySelector("#navBar").addEventListener("click",
        (event) => {
            html = ""
            if (event.target.id === "navNews") {
                html =
                    `<h1>News</h1>
                <section id = "news">
                <section id="newsListSection"></section>
                <section id="newsFormSection"></section>
            </section>`
                printToDom(html, "#tabContainer")
                createNews()
            }
            else if (event.target.id === "navEvents") {
                html = `
            <h1>Events</h1>
            <section id = "events">
            </section>`
                printToDom(html, "#tabContainer")
                createEvents()
            } else if (event.target.id === "navTasks") {
                html = `
                    <h1>Tasks</h1>
                    <section id = "tasks">
                    </section>`
                    printToDom(html, "#tabContainer")
                    createTasks()
            }
    })
}

export default navbar