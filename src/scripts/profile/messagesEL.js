import createPrivateMessages from "../privateMessages/createPrivateMessages";

const messagesEL = () => {

  window.addEventListener("storage", function (e) {
    // if (e.storageArea === localStorage) {
    console.log(parseInt(localStorage.getItem("count")))
    console.log(parseInt(localStorage.getItem("senderId")))
    console.log(parseInt(document.querySelector("#friendId").value))
    console.log(parseInt(localStorage.getItem("recipientId")))
    console.log(parseInt(document.querySelector("#userId").value))

    if ((parseInt(localStorage.getItem("senderId")) === parseInt(document.querySelector("#friendId").value)) && (parseInt(localStorage.getItem("recipientId")) === parseInt(document.querySelector("#userId").value))) {
      createPrivateMessages(parseInt(document.querySelector("#friendId").value))
    }
  })
}
// )
// }



export default messagesEL