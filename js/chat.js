const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Store messages locally for now
let messages = [];

// Function to send a message
function sendChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    const msgObj = {
        user: window.userEmail || 'Guest',
        message: text,
        timestamp: new Date().toLocaleTimeString()
    };

    messages.push(msgObj);
    displayMessages();
    chatInput.value = '';
}

// Function to display messages
function displayMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('chat-message');
        div.innerHTML = `<strong>${msg.user}:</strong> ${msg.message} <span class="time">${msg.timestamp}</span>`;
        chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Optional: press Enter to send
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendChat();
});