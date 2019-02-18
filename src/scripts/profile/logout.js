import checkSessionstorage from "./checkSessionStorage";

const logout = () => {
    document.querySelector("#logout").addEventListener("click",
    () => {
        //clear sessionStorage
        sessionStorage.removeItem("userID")
        sessionStorage.clear()
        checkSessionstorage()
    })
}


export default logout