import createEvents from "./createEvent"
import createFriends from "./createFriends"
import createNews from "./createNews"

const populateProfile = () => {
    createFriends();
    createEvents();
    // createNews();
    // createTasks();
}

export default populateProfile

