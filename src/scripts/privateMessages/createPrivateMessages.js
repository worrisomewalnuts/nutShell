import API from "../utilities/apiManager";
import privateMessageHTML from "./privateMessageHTML";


function createPrivateMessages(id) {
    let friendId = parseInt(id)
    let userId = parseInt(document.querySelector("#userId").value)
    return API.GET("privateMessages")
    .then((parsedPrivMessages)=> {
        let messagesInThisConversation = parsedPrivMessages.filter((message) => {
            return ((message.senderId === userId && message.recipientId === friendId) || (message.senderId === friendId && message.recipientId === userId))
        })
        return messagesInThisConversation
    })
    .then((messagesInThisConversation)=> {
        privateMessageHTML(messagesInThisConversation)
    })
}

export default createPrivateMessages