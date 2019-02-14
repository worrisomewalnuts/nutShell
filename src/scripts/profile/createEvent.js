import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM"
import { eventHtml, createAddEventHtml } from "./eventHTML"
import createNewEvent from "./eventManager"
const createEvents = () => {
    let html = ""
    //creates Html to that is used to add a new event
    html += createAddEventHtml()

    //make a section container for all events
    html += `
<section id="eventsContainer">
`
    //todo we will need to make sure we are using our hidden field user id here
    API.GET("events?userId=1").then(parsedEvent => {
        parsedEvent.forEach(event => {
            html += eventHtml(event)
        })
        html += `
        </section>
        `
        printToDom(html, "#events")

        document.querySelector("#submitEvent").addEventListener("click", function () {
            API.POST("events", createNewEvent()).then(() => {
                createEvents()
            })
        })

        document.querySelector("#eventsContainer").addEventListener("click", function () {

            let action = event.target.id.split("--")[0]
            let actionId = event.target.id.split("--")[1]

            if (action === "edit") {

            } else if (action === "delete") {
                API.DELETE(`events/${actionId}`).then(() =>
                    createEvents())
            }
        })
    })
}



export default createEvents