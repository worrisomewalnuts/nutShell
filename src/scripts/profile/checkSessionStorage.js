import makeProfileHTML from "./makeProfileHTML"
import makeLoginHtml from "../login/makeLoginHTML"

const checkSessionstorage = () => {
    //if sessionStorage has UseId then skip login page
    if( sessionStorage.getItem("userID") === null || sessionStorage.getItem("userID") === undefined)
        makeLoginHtml()
    else {
        makeProfileHTML(sessionStorage.getItem("userID"))
    }

    //todo somewhere else will do this now
    //makeProfileHTML(1)
}

export default checkSessionstorage