const setTimer = () => {

    window.addEventListener("storage", function(e) {
        if(e.storageArea===localStorage){
            alert("change");
          }
        })
}



export default setTimer