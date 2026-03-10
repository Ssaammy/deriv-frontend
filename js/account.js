// frontend/js/account.js

// Simple localStorage-based login simulation for prototype
let currentUser = JSON.parse(localStorage.getItem("user")) || null;

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const apiBtn = document.getElementById("apiBtn");

// Prompt for login
if (loginBtn) loginBtn.addEventListener("click", () => {
  let email = prompt("Enter your email:");
  let password = prompt("Enter your password:");
  if (email && password) {
    currentUser = { email: email, token: null, balance: 1000, accountType: "demo" };
    localStorage.setItem("user", JSON.stringify(currentUser));
    showNotification("Logged in successfully!", "success");
    updateDashboardUI();
  }
});

// Sign up
if (signupBtn) signupBtn.addEventListener("click", () => {
  let email = prompt("Enter your email to sign up:");
  if (email) {
    currentUser = { email: email, token: null, balance: 1000, accountType: "demo" };
    localStorage.setItem("user", JSON.stringify(currentUser));
    showNotification("Signed up successfully!", "success");
    updateDashboardUI();
  }
});

// Logout
if (logoutBtn) logoutBtn.addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem("user");
  showNotification("Logged out!", "info");
  updateDashboardUI();
});

// API Token
if (apiBtn) apiBtn.addEventListener("click", () => {
  if (!currentUser) {
    showNotification("Please log in first!", "error");
    return;
  }
  let token = prompt("Enter your Deriv API token:");
  if (token) {
    currentUser.token = token;
    localStorage.setItem("user", JSON.stringify(currentUser));
    showNotification("API token saved!", "success");
    enableTradingButtons(true);
  }
});

// Update account info in dashboard
function updateDashboardUI() {
  if (!currentUser) {
    document.getElementById("userEmail")?.innerText = "-";
    document.getElementById("userBalance")?.innerText = "-";
    document.getElementById("displayToken")?.innerText = "-";
    enableTradingButtons(false);
  } else {
    document.getElementById("userEmail")?.innerText = currentUser.email;
    document.getElementById("userBalance")?.innerText = currentUser.balance;
    document.getElementById("displayToken")?.innerText = currentUser.token || "-";
    enableTradingButtons(currentUser.token ? true : false);
  }
}

function enableTradingButtons(enable) {
  document.getElementById("buyBtn")?.setAttribute("disabled", !enable);
  document.getElementById("sellBtn")?.setAttribute("disabled", !enable);
}

// Initial load
updateDashboardUI();