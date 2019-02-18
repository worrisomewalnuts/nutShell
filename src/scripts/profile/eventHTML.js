
const eventHtml = (event, eventClass) => {
    let html = ""

    html +=
        `
        <p>---------------------------------------------------</p>
        <section id="section--${event.id}" class="${eventClass}">
        <p>User: ${event.user.userName}</p>
        <p>Event: ${event.eventName}</p>
        <p>Event Location: ${event.eventLocation}</p>
        <p>Event Date: ${event.eventDate}</p>
        `
    if (eventClass != "friendEvent"){

        html +=
            `
            <button id="edit--${event.id}">Edit</button>
            <button id="delete--${event.id}">Delete</button>
            `
    }
    html +=
        `
        </section>
        `
    return html
}

const createAddEventHtml = () => {
    return `
    <section id = "addEventSection">
        <label>Event Name: </label>
        <input type="text" id="eventNameInput"></input>
        <label>Event Location: </label>
        <input type="text" id="eventLocationInput"></input>
        <label>Event Date: </label>
        <input type="date" name="eventDate" id="eventDateInput"></input:date>
        <button id="submitEvent" value="0">submit</button>
    </section>
    `
}
export { eventHtml, createAddEventHtml }