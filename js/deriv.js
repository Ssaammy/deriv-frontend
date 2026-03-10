// deriv.js

let ws; // WebSocket
let symbol = "AUDUSD"; // Replace with Deriv AUD Basket symbol if different

function connectDeriv() {
    if (!userAccount.apiToken) {
        alert("Please enter a valid API token first");
        return;
    }

    if(ws && ws.readyState === WebSocket.OPEN){
        ws.close(); // Close previous connection
    }

    ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");

    ws.onopen = () => {
        console.log("Connected to Deriv WebSocket ✅");

        // Authorize with API token
        ws.send(JSON.stringify({
            authorize: userAccount.apiToken
        }));

        // Subscribe to ticks for the selected symbol
        ws.send(JSON.stringify({
            ticks: symbol
        }));
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);

        // Tick updates
        if(data.tick){
            const price = parseFloat(data.tick.quote);
            addTickToChart(price); // chart.js function

            // Update percentage change
            let change = ((price - 940.518)/940.518*100).toFixed(3);
            document.getElementById("percentageChange").innerText = `${change>=0?'+':''}${change} (${change}%)`;
        }

        // Optional: balance update if userAccount.type is real and Deriv API provides it
        if(data.authorize){
            userAccount.email = data.authorize.email || "N/A";
            updateAccountUI();
        }
    };

    ws.onerror = (err) => {
        console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
        console.log("Disconnected from Deriv WebSocket ❌");
    };
}