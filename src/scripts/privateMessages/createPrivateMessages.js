import API from "../utilities/apiManager";
import privateMessageHTML from "./privateMessageHTML";
import messagesEL from "../profile/messagesEL";


function createPrivateMessages(id) {
    let oldElement = document.querySelector("#tabContainer")
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement);
    let friendId = parseInt(id)
    // let friendId = parseInt(document.querySelector("#friendId").value)
    let userId = parseInt(document.querySelector("#userId").value)
    return API.GET("privateMessages")
    .then((parsedPrivMessages)=> {
        let messagesInThisConversation = parsedPrivMessages.filter((message) => {
            return ((message.senderId === userId && message.recipientId === friendId) || (message.senderId === friendId && message.recipientId === userId))
        })
        return messagesInThisConversation
    })
    .then((messagesInThisConversation)=> {
        privateMessageHTML(messagesInThisConversation, friendId)
    })
}

export default createPrivateMessages