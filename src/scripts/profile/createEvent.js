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
    let currentUserId = document.querySelector("#userId").value

    API.GET(`events?userId=${currentUserId}`).then(parsedEvent => {
        parsedEvent.forEach(event => {
            html += eventHtml(event)
        })
        html += `
        </section>
        `
        printToDom(html, "#events")

        document.querySelector("#submitEvent").addEventListener("click", function () {


            if (document.querySelector("#submitEvent").textContent === "Edit") {
                const eventIdToEdit = document.querySelector("#submitEvent").value
                API.EDIT(`events/${eventIdToEdit}`, createNewEvent()).then(() => {
                    createEvents()
                })
            } else {
                API.POST("events", createNewEvent()).then(() => {
                    createEvents()
                })
            }
        })

        document.querySelector("#eventsContainer").addEventListener("click", function () {

            let action = event.target.id.split("--")[0]
            let actionId = event.target.id.split("--")[1]

            if (action === "edit") {
                API.GET(`events?id=${actionId}`).then(event => {
                    document.querySelector("#eventNameInput").value = event[0].eventName
                    document.querySelector("#eventLocationInput").value = event[0].eventLocation
                    document.querySelector("#eventDateInput").value = event[0].eventDate
                    document.querySelector("#submitEvent").textContent = "Edit"
                    document.querySelector("#submitEvent").value = event[0].id

                    // API.POST("events", createNewEvent()).then(() => {
                    //     createEvents()
                    // })
                })

                document.querySelector("#eventNameInput").value = "fofo"
            } else if (action === "delete") {
                API.DELETE(`events/${actionId}`).then(() =>
                    createEvents())
            }
        })
    })
}



export default createEvents