import registerNewUser from "./registerNewUser"

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
            console.log("login")
        }else if(event.target.id === "signUp"){
            registerNewUser()
        }
    })
}

export default makeLoginHtml