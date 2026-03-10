let chartContainer = document.getElementById('chart');
let priceEl = document.getElementById('price');
let changeEl = document.getElementById('change');
let symbolSelect = document.getElementById('symbolSelector');

let chart = LightweightCharts.createChart(chartContainer, {
    layout: {
        backgroundColor: '#1e1e2f',
        textColor: '#d1d4dc',
    },
    grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
    },
    rightPriceScale: {
        borderColor: '#444',
    },
    timeScale: {
        borderColor: '#444',
        timeVisible: true,
        secondsVisible: true,
    },
});

let candleSeries = chart.addCandlestickSeries({
    upColor: '#4bffb5',
    downColor: '#ff4976',
    borderVisible: false,
    wickUpColor: '#4bffb5',
    wickDownColor: '#ff4976',
});

let userApiToken = null; // Will be set from account.js

let ws = null;

function connectDeriv(symbol) {
    if (ws) ws.close();

    ws = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=1089&l=${userApiToken || ''}`);

    ws.onopen = () => {
        console.log('Connected to Deriv WebSocket');
        // Subscribe to ticks for selected symbol
        ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);

        // Tick data
        if (data.tick) {
            const tick = data.tick;
            const time = tick.epoch; // seconds
            const price = tick.quote;

            priceEl.textContent = price.toFixed(3);

            // Simple % change calculation (for demo)
            let prev = candleSeries.dataByIndex(candleSeries.dataByIndex.length - 1)?.close || price;
            let pctChange = ((price - prev) / prev) * 100;
            changeEl.textContent = pctChange.toFixed(2) + '%';

            // Update chart with last candle (1-minute candle simulation)
            let lastCandle = candleSeries.dataByIndex(candleSeries.dataByIndex.length - 1);
            let timeSec = time;

            if (!lastCandle || lastCandle.time !== timeSec) {
                candleSeries.update({ time: timeSec, open: price, high: price, low: price, close: price });
            } else {
                candleSeries.update({
                    time: timeSec,
                    open: lastCandle.open,
                    high: Math.max(lastCandle.high, price),
                    low: Math.min(lastCandle.low, price),
                    close: price,
                });
            }
        }
    };

    ws.onerror = (err) => {
        console.error('WebSocket error:', err);
    };

    ws.onclose = () => console.log('Deriv WebSocket closed');
}

// Change symbol when dropdown changes
function changeSymbol() {
    const symbol = symbolSelect.value;
    connectDeriv(symbol);
}

// Initialize default symbol
connectDeriv(symbolSelect.value);