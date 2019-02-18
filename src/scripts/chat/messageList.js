import API from "../utilities/apiManager"
import messageHTML from "./messageHTML"


function messageList() {
    return API.GET("chatMessages")
        .then((parsedMessages) => messageHTML(parsedMessages))
}

export default messageList