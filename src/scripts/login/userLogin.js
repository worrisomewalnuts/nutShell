import API from "../utilities/apiManager"
import makeProfileHTML from "../profile/makeProfileHTML"
const userLogin = () => {
    let html = `
    <h1>Login</h1>
    <label>UserName</label>
    <input id="userName"></input>
    <label>Password</label>
    <input id="password"></input>
    <button id="loginUser">Login</button>
    `
    document.querySelector(".output").innerHTML = html

    document.querySelector("#loginUser").addEventListener("click", function () {
        //search where loginUser matches one in database. then check to make sure password is a match
        let userNameSearchString = document.querySelector("#userName").value
        let  userPassword= document.querySelector("#password").value
        API.GET(`users?userName=${userNameSearchString}`).then(user => {
            if(user[0].pass === userPassword){
                //adding key(userID) to storageSession
                sessionStorage.setItem("userID", `${user[0].id}`)
                makeProfileHTML(user[0].id)
            }else{
                alert("wrong password")
            }
        })
    })
}
export default userLogin