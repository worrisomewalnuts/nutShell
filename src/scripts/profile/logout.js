import checkSessionstorage from "./checkSessionStorage";

const logout = () => {
    document.querySelector("#logout").addEventListener("click",
    () => {
        //clear sessionStorage
        sessionStorage.removeItem("userID")
        checkSessionstorage()
    })
}


export default logout