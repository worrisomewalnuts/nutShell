import createEvents from "./createEvent"
import createFriends from "./createFriends"

const populateProfile = () => {
    createFriends();
    createEvents();
    // createNews();
    // createTasks();
}

export default populateProfile

