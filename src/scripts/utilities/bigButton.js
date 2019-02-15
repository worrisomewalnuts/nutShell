import makeProfileHTML from "../profile/makeProfileHTML";
import makeChatHTML from "../chat/makeChatHTML"

function bigButton() {
    let classList = document.querySelector("#bigButtonSection").classList
    let userId = document.querySelector("#userId").value

    if (classList.contains("inProfile")){
        makeChatHTML(userId)
    }
    else if (classList.contains("inChat")) {
        makeProfileHTML(userId)
    }
}

export default bigButton