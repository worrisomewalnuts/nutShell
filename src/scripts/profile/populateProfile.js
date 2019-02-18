import createEvents from "./createEvent"
import createFriends from "./createFriends"
import createTasks from "./createTasks";
import bigButton from "../utilities/bigButton"
import createNews from "./createNews"

const populateProfile = () => {
    
    createFriends();
    // createEvents();
    // createNews();
    // createTasks();

    let oldElement = document.querySelector("#bigButton")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    document.querySelector("#bigButton").addEventListener("click", bigButton)
}

export default populateProfile

