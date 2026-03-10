// account.js

let userAccount = {
    email: "",
    apiToken: "",
    type: "demo", // demo or real
    balance: 0
};

// Open prompt to enter API token
function enterApiToken() {
    const token = prompt("Enter your Deriv API token:");
    if (token && token.length > 0) {
        userAccount.apiToken = token;
        alert("API token saved ✅");
        // Here you can trigger connection to Deriv WS
        connectDeriv();
    }
}

// Switch account type
function switchAccount(type) {
    userAccount.type = type; // "demo" or "real"
    updateAccountUI();
}

// Update account section UI
function updateAccountUI() {
    document.getElementById("botStatus").innerText = `Account: ${userAccount.type.toUpperCase()} | ${userAccount.email || "No email"} | Balance: ${userAccount.balance}`;
}

// Logout
function logout() {
    userAccount = {email:"", apiToken:"", type:"demo", balance:0};
    updateAccountUI();
    alert("Logged out ✅");
}