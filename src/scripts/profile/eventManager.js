import { isEmpty, isProfanity } from "../utilities/dataValidation"

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

    let event = ""
    if (isEmpty(name) || isEmpty(location) || isEmpty(date)) {
        alert("One or more fields are empty")
    } else if (isProfanity(name) || isProfanity(location) || isProfanity(date)) {
        alert("One or more fields contain profanity")
    } else {
        event = new Event(currentUserId, name, location, date);
    }
    return event
}
export default createNewEvent