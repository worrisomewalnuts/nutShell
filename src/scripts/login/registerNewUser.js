import API from "../utilities/apiManager"
import makeProfileHTML from "../profile/makeProfileHTML"
const registerNewUser = () => {
    let html = `
<h1>Sign Up</h1>
<section id="signUpSection">
<label>UserName: </label>
<input id="userName"></input>
<label>Password: </label>
<input id="password"></input>
<label>Email: </label>
<input id="email"></input>
<label>First Name: </label>
<input id="firstName"></input>
<label>Last Name: </label>
<input id="lastName"></input>
<button id="registerNewUser">Register</button>
</section>
`
    document.querySelector(".output").innerHTML = html

    document.querySelector("#registerNewUser").addEventListener("click", function () {
       let newUser = createNewUser()


        //todo dont think i checked if a username was already taken. Probably need to do that

    API.POST("users", newUser).then(newUser=>{
        //adding key(userID) to storageSession
        sessionStorage.setItem("userID", `${newUser.id}`)
        makeProfileHTML(newUser.id)
    })


    })
}

class User {
    constructor(userName, password, email, firstName, lastName) {
        this.userName = userName
        this.password = password,
            this.email = email,
            this.firstName = firstName,
            this.lastName = lastName
    }
}

const createNewUser = () => {

    const userName = document.querySelector("#userName").value
    const password = document.querySelector("#password").value
    const email = document.querySelector("#email").value
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    let user = new User(userName, password, email, firstName, lastName);
    return user

}






export default registerNewUser