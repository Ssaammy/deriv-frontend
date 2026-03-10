// chart.js
// Get chart container
const chartContainer = document.getElementById("chart");

// Create chart with Lightweight Charts
const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 400,
    layout: {
        backgroundColor: '#0f172a',
        textColor: '#ffffff',
    },
    grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
    },
    rightPriceScale: { borderColor: '#334155' },
    timeScale: { borderColor: '#334155', timeVisible: true, secondsVisible: true },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
});

// Candlestick series
const candleSeries = chart.addCandlestickSeries({
    upColor: '#22c55e',
    downColor: '#ef4444',
    borderVisible: false,
    wickUpColor: '#22c55e',
    wickDownColor: '#ef4444',
});

// Store last 50 candles
let candles = [];

// Function to update price display
function updatePriceDisplay(price) {
    const priceEl = document.getElementById("price");
    const changeEl = document.getElementById("change");
    const prev = candles.length > 0 ? candles[candles.length - 1].close : price;
    if (priceEl) priceEl.innerText = price.toFixed(3);
    if (changeEl) {
        const change = ((price - prev) / prev * 100).toFixed(2);
        changeEl.innerText = `${change >= 0 ? '+' : ''}${change}%`;
        changeEl.className = change >= 0 ? "ml-2 text-green-400" : "ml-2 text-red-500";
    }
}

// Connect to Deriv WebSocket
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
            const tickPrice = data.tick.quote;
            const time = Math.floor(Date.now() / 1000);

            updatePriceDisplay(tickPrice);

            // Create candlestick (1-second candle)
            let lastCandle = candles.length > 0 ? candles[candles.length - 1] : null;

            if (!lastCandle || time > lastCandle.time) {
                // Start new candle
                const candle = { time, open: tickPrice, high: tickPrice, low: tickPrice, close: tickPrice };
                candles.push(candle);
                if (candles.length > 50) candles.shift(); // keep last 50 candles
                candleSeries.setData(candles);
            } else {
                // Update current candle
                lastCandle.high = Math.max(lastCandle.high, tickPrice);
                lastCandle.low = Math.min(lastCandle.low, tickPrice);
                lastCandle.close = tickPrice;
                candleSeries.update(lastCandle);
            }
        }
    };

    ws.onclose = () => console.log("Deriv WebSocket closed");
    ws.onerror = (err) => console.log("Deriv WebSocket error:", err);
}

// Initial symbol
connectDeriv(document.getElementById("symbolSelector").value);

// Change symbol dynamically
document.getElementById("symbolSelector").addEventListener("change", (e) => {
    connectDeriv(e.target.value);
});

// Resize chart when window resizes
window.addEventListener("resize", () => {
    chart.resize(chartContainer.clientWidth, 400);
});