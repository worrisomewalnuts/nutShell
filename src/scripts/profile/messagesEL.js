import createPrivateMessages from "../privateMessages/createPrivateMessages";

const $ = document.querySelector.bind(document)


const messagesEL = () => {
  //window.removeEventListener("storage", checkMessage())
  window.addEventListener("storage", (e) => {
    //if changes made in localStorage
    if (e.storageArea === localStorage) {
      //check recipient Id is same as usder ID
      if (parseInt(localStorage.getItem("recipientId")) === parseInt($("#userId").value)) {
        //check sender id is same as friend is
        if (parseInt(localStorage.getItem("senderId")) === parseInt($("#friendId").value)) {
          //fetch new data from API
          createPrivateMessages(parseInt(localStorage.getItem("senderId")))
          localStorage.clear()
        }
      }
    }
  })
}



export default messagesEL