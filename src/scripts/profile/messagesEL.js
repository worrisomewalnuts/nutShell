import createPrivateMessages from "../privateMessages/createPrivateMessages";

const $ = document.querySelector.bind(document)

const messagesEL = () => {

    window.addEventListener("storage", function(e) {
        if(e.storageArea===localStorage){
            let msg = localStorage.getItem("recipientId")
            let i = $("#userId").value
            //console.log(localStorage.getItem("recipientId"))
            if (parseInt(localStorage.getItem("senderId"))=== parseInt($("#userId").value))
              createPrivateMessages(localStorage.getItem("senderId"))
          }
        })
}



export default messagesEL