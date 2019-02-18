class Event {
    constructor(userId, name, location, date) {
        this.userId = userId
        this.eventName = name,
            this.eventLocation = location,
            this.eventDate = date
    }
}

const createNewEvent = () => {
    let currentUserId = document.querySelector("#userId").value

    const name = document.querySelector("#eventNameInput").value
    const location = document.querySelector("#eventLocationInput").value
    const date = document.querySelector("#eventDateInput").value
    let event = new Event(currentUserId, name, location, date);
    return event

}
export default createNewEvent