import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM"
import { eventHtml, createAddEventHtml } from "./eventHTML"
import createNewEvent from "./eventManager"

let html = ""
const createEvents = () => {
    html = ""
    //creates Html to that is used to add a new event
    html += createAddEventHtml()

    //make a section container for all events
    html +=
    `
    <section id="eventsContainer">
    `
    //todo we will need to make sure we are using our hidden field user id here
    let currentUserId = document.querySelector("#userId").value

    API.GET(`friendships?userId=${currentUserId}`).then(parsedFriendIds => {
        const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
        idsNeededArray.push(parseInt(currentUserId))
        return idsNeededArray
    }).then(idsNeededArray => {

        let getAPIFriendSearch = ""
        idsNeededArray.forEach(id => {
            getAPIFriendSearch += `userId=${id}&_expand=user&`
        });

        API.GET(`events?${getAPIFriendSearch}`).then(parsedEvents => {

            let sortedEvents = parsedEvents.sort(function (eventA, eventB) {
                return new Date(eventA.eventDate) - new Date(eventB.eventDate);
            })
            let oldestEventFlag = true
            sortedEvents.forEach(event => {
                let eventClass = ""

                //check if this event is a friend. if not check if it is the users closest event.
                if (event.userId != currentUserId) {
                    eventClass = "friendItem"
                } else if (oldestEventFlag === true) {
                    eventClass += " oldestEvent"
                    oldestEventFlag = false
                }
                html += eventHtml(event, eventClass)
            })
        }).then(function () {
            html += `
                </section>
                `

            printToDom(html, "#events")

            //event for submit/edit button. checks whats its toggled to
            document.querySelector("#submitEvent").addEventListener("click", function () {

                if (document.querySelector("#submitEvent").textContent === "Edit") {
                    const eventIdToEdit = document.querySelector("#submitEvent").value
                    API.EDIT(`events/${eventIdToEdit}`, createNewEvent()).then(() => {
                        createEvents()
                    })
                } else {
                    const newEvent = createNewEvent()
                    //passed datavalidation
                    if (newEvent != "") {
                        API.POST("events", newEvent).then(() => {
                            createEvents()
                        })
                    }
                }
            })

            //event listener for single event edit and delete button
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
                    })

                    document.querySelector("#eventNameInput").value = "fofo"
                } else if (action === "delete") {
                    API.DELETE(`events/${actionId}`).then(() =>
                        createEvents())
                }
            })
        });
    })
}

export default createEvents