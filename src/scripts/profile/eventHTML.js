
const eventHtml = (event) =>{
    return `
    <p>---------------------------------------------------</p>
    <section id="section--${event.id}">
    <p>${event.eventName}</p>
    <p>${event.eventLocation}</p>
    <p>${event.eventDate}</p>
    <button id="edit--${event.id}">Edit</button>
    <button id="delete--${event.id}">Delete</button>
    </section>
    <p>---------------------------------------------------</p>
    `
}

const createAddEventHtml=()=>{
    return `
    <section id="addEventSection">
    <label>Event Name: </label>
    <input type="text" id="eventNameInput"></input>
    <label>Event Location: </label>
    <input type="text" id="eventLocationInput"></input>
    <label>Event Date: </label>
    <input type="text" id="eventDateInput"></input>
    <button id="submitEvent" value="0">submit</button>
    </section>
    `
}
export {eventHtml, createAddEventHtml}