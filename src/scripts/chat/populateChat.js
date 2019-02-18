import bigButton from "../utilities/bigButton"
import messageList from "./messageList"

const populateChat = () => {
    // clones bigButton to remove any event listeners that were previously assigned
    let oldElement = document.querySelector("#bigButton")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    document.querySelector("#bigButton").addEventListener("click", bigButton)

    messageList()
}

export default populateChat