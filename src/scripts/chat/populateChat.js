import bigButton from "../utilities/bigButton"
import messageList from "./messageList"

const populateChat = () => {
    let oldElement = document.querySelector("#bigButton")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    document.querySelector("#bigButton").addEventListener("click", bigButton)

    messageList()
}

export default populateChat