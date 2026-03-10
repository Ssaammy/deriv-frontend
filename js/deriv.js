// frontend/js/deriv.js

let ws;
let market = "R_50"; // default market

// Enable trading only if API token is provided
function initDeriv() {
  if (!currentUser || !currentUser.token) return;

  ws = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=1089&l=${currentUser.token}`);

  ws.onopen = () => {
    showNotification("Connected to Deriv WebSocket!", "success");
    subscribeMarket(market);
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    // Handle trading info updates here if needed
    console.log("Deriv WS message:", data);
  };

  ws.onerror = () => showNotification("WebSocket connection error!", "error");
}

// Subscribe to ticks for selected market
function subscribeMarket(symbol) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ ticks: symbol }));
  }
}

// Buy/Sell button actions
document.getElementById("buyBtn")?.addEventListener("click", () => {
  if (!currentUser || !currentUser.token) return showNotification("API token required", "error");
  showNotification("Buy order placed (demo)", "info");
});

document.getElementById("sellBtn")?.addEventListener("click", () => {
  if (!currentUser || !currentUser.token) return showNotification("API token required", "error");
  showNotification("Sell order placed (demo)", "info");
});

// Initialize on page load
initDeriv();