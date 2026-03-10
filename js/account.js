// Simulated account management
// Will store API token, email, account type (demo/real)

let userApiToken = null; // This will be used by chart.js and deriv.js
let userEmail = null;
let accountType = 'demo'; // default

// Function to show login popup
function login() {
    const email = prompt('Enter your email:');
    const token = prompt('Enter your Deriv API token:');

    if (!email || !token) {
        alert('Login cancelled or missing credentials.');
        return;
    }

    userEmail = email;
    userApiToken = token;

    // Save to localStorage so it persists on refresh
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userApiToken', userApiToken);
    localStorage.setItem('accountType', accountType);

    alert('Login successful!');

    // Update chart.js token
    if (typeof chart !== 'undefined') {
        window.userApiToken = userApiToken;
        console.log('API token updated for chart');
    }

    // Update UI
    updateAccountUI();
}

// Function to show API token input
function enterApiToken() {
    const token = prompt('Enter your Deriv API token:');
    if (!token) return;
    userApiToken = token;
    localStorage.setItem('userApiToken', token);
    alert('API token saved!');
    if (typeof chart !== 'undefined') {
        window.userApiToken = userApiToken;
    }
}

// Function for sign up (placeholder)
function signup() {
    alert('Sign up functionality not implemented yet.');
}

// Log out function
function logout() {
    userApiToken = null;
    userEmail = null;
    accountType = 'demo';
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userApiToken');
    localStorage.removeItem('accountType');
    alert('Logged out successfully!');
    updateAccountUI();
}

// Update UI to show logged-in user info
function updateAccountUI() {
    const navLinks = document.querySelector('.nav-links');
    if (userEmail) {
        navLinks.innerHTML = `
            <span>Welcome, ${userEmail}</span>
            <button onclick="logout()">Log Out</button>
            <button onclick="enterApiToken()">API Token</button>
        `;
    } else {
        navLinks.innerHTML = `
            <button onclick="login()">Log In</button>
            <button onclick="enterApiToken()">API Token</button>
            <button onclick="signup()">Sign Up</button>
        `;
    }
}

// Load from localStorage on page load
window.onload = () => {
    userEmail = localStorage.getItem('userEmail');
    userApiToken = localStorage.getItem('userApiToken');
    accountType = localStorage.getItem('accountType') || 'demo';
    updateAccountUI();
    // Expose token globally for chart.js
    window.userApiToken = userApiToken;
};