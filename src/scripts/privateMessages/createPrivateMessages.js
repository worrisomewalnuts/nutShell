import API from "../utilities/apiManager";

function createPrivateMessages(id) {
    let friendId = id
    let userId = parseInt(document.querySelector("#userId").value)
    return API.GET("privateMessages")
    .then((parsedPrivMessages)=> {
        let messagesInThisConversation = parsedPrivMessages.filter((message) => {
            return ((message.senderId === userId && message.recipientId === friendId) || (message.senderId === friendId && message.recipientId === userId)
        })
        return messagesInThisConversation
    })
    .then((messagesInThisConversation)=> console.log({messagesInThisConversation}))
}

export default createPrivateMessages