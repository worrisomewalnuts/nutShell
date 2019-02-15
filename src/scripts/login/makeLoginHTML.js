import registerNewUser from "./registerNewUser"
import userLogin from "./userLogin"

const makeLoginHtml = () => {
    let html = `
    <h1>Welcome to NutShell</h1>
    <section id="loginPageOptions">
    <a href="javascript:;" id="login">Login</a>
    <a href="javascript:;" id="signUp">Sign-up</a>
    <section>
    `
    document.querySelector(".output").innerHTML = html

    document.querySelector("#loginPageOptions").addEventListener("click", function(){

        if (event.target.id === "login"){
            userLogin()
        }else if(event.target.id === "signUp"){
            registerNewUser()
        }
    })
}

export default makeLoginHtml