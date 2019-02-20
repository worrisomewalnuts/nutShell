import createPrivateMessages from "../privateMessages/createPrivateMessages";

const messagesEL = () => {

  window.addEventListener("storage", function (e) {
    if ((parseInt(localStorage.getItem("senderId")) === parseInt(document.querySelector("#friendId").value)) && (parseInt(localStorage.getItem("recipientId")) === parseInt(document.querySelector("#userId").value))) {
      createPrivateMessages(parseInt(document.querySelector("#friendId").value))
    }
  })
}

export default messagesEL