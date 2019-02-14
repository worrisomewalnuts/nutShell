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

        document.querySelector("#eventContainer").addEventListener("click", function(){


            console.log(event.target.id)
            //if(event.target.id)
        })
    })
}



export default createEvents