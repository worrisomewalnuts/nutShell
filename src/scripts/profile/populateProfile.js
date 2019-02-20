
import createFriends from "./createFriends"
import bigButton from "../utilities/bigButton"

const populateProfile = () => {
    // localStorage.setItem("count", 0)
    createFriends();

    let oldElement = document.querySelector("#bigButton")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    document.querySelector("#bigButton").addEventListener("click", bigButton)
}

export default populateProfile

