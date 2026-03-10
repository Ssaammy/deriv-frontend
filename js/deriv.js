// Simple Deriv WebSocket connection
let ws;

function connectDeriv(symbol = "R_100") {
    if (ws) ws.close();

    ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");

    ws.onopen = () => {
        ws.send(JSON.stringify({ ticks: symbol }));
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.tick) {
            const price = data.tick.quote;
            updatePrice(price);
            candleSeries.update({ time: Math.floor(Date.now() / 1000), open: price, high: price, low: price, close: price });
        }
    };

    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = (err) => console.log("WebSocket error", err);
}

// Initial connection
connectDeriv("R_100");

// Change symbol dynamically
document.getElementById("symbolSelector").addEventListener("change", (e) => {
    connectDeriv(e.target.value);
});