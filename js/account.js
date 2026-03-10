function login(){

let email=prompt("Enter email")

localStorage.setItem("email",email)

alert("Logged in")

}

function signup(){

alert("Signup system coming soon")

}

function logout(){

localStorage.removeItem("email")

alert("Logged out")

}

function enterApiToken(){

let token=prompt("Enter API token")

localStorage.setItem("token",token)

alert("API token saved")

}