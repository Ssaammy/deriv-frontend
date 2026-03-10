let userEmail = "user@example.com";
let balance = 1000;
let accountType = "Demo";

function login() {
    const email = prompt("Enter email:");
    userEmail = email || userEmail;
    document.getElementById("userEmail").innerText = userEmail;
}

function signup() {
    alert("Sign up clicked!");
}

function logout() {
    alert("Logged out!");
    userEmail = "user@example.com";
    document.getElementById("userEmail").innerText = userEmail;
}

function enterApiToken() {
    const token = prompt("Enter your API token:");
    if (token) alert("API token saved ✅");
}