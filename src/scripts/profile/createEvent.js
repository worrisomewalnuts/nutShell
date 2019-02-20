import API from "../utilities/apiManager"
import printToDom from "../utilities/printToDOM"
import { eventHtml, createSubmitSectionHtml } from "./eventHTML"
import createNewEvent from "./eventManager"


let currentUserId = "";
let html = ""
const createEvents = () => {
    //clear old html
    html = ""
    //creates Html to that is used to add a new event
    html += createSubmitSectionHtml()

    //make a section container for all events
    html +=
        `
    <section id="eventsContainer">
    `

    //set user id of who we are logged in as
    currentUserId = document.querySelector("#userId").value

    API.GET(`friendships?userId=${currentUserId}`).then(parsedFriendIds => {

        let eventsQuery = getUserAndFriendsEventsQuery(parsedFriendIds)
        return eventsQuery

    }).then(eventsQuery => {

        API.GET(`events?${eventsQuery}`).then(parsedEvents => {

            //filter only events occuring after todays date
            let datesAfterCurrentDate = getDatesAfterCurrentDate(parsedEvents);
            //sort by dates
            let sortedEvents = getSortedArrayByDate(datesAfterCurrentDate);

            //make sections for each event in the api
            html = createEventsHtml(sortedEvents, html)
        }).then(function () {

            //end tag for overarching container
            html += `
            </section>
            `
            //print all html
            printToDom(html, "#events")

            //event for submit/edit button. checks whats its toggled to
            addSubmitAndEditListener()
            //event listener for single event edit and delete button
            addSingleEventEditAndDeleteListener()
        });
    })
}

const getDatesAfterCurrentDate = (arrayToFilter) => {
    const datesAfterCurrentDate = arrayToFilter.filter(function (event) {
        if (new Date(event.eventDate) > new Date()) {
            return event
        }
    })
    return datesAfterCurrentDate
}

const getSortedArrayByDate = (arrayToSort) => {
    const sortedDateArray = arrayToSort.sort(function (eventA, eventB) {
        return new Date(eventA.eventDate) - new Date(eventB.eventDate);
    })
    return sortedDateArray
}

const addSubmitAndEditListener = () => {

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
}

const addSingleEventEditAndDeleteListener = () => {

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
}


const createEventsHtml = (sortedEvents, html) => {

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
    return html
}

const getUserAndFriendsEventsQuery = (parsedFriendIds) => {
    const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
    idsNeededArray.push(parseInt(currentUserId))

    let eventsQuery = ""
    //create part of the query that will be used in the api
    idsNeededArray.forEach(id => {
        eventsQuery += `userId=${id}&_expand=user&`
    });
    return eventsQuery
}

export default createEvents