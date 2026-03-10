// frontend/js/chart.js

let chartContainer = document.getElementById('chart');
let chart = LightweightCharts.createChart(chartContainer, {
  width: chartContainer.clientWidth,
  height: 400,
  layout: { backgroundColor: '#1e1e2f', textColor: '#d1d4dc' },
  rightPriceScale: { borderColor: '#555' },
  timeScale: { borderColor: '#555', timeVisible: true, secondsVisible: true }
});
let candleSeries = chart.addCandlestickSeries();

let prevPrice = null;
let market = "R_50"; // default market
let ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");

// Update chart with live data
ws.onopen = () => ws.send(JSON.stringify({ ticks: market }));

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data.tick) {
    const price = data.tick.quote;
    const time = data.tick.epoch;
    candleSeries.update({ time: time, open: price, high: price, low: price, close: price });

    document.getElementById("currentPrice").innerText = price.toFixed(3);
    if (prevPrice !== null) {
      const change = price - prevPrice;
      const percent = (change / prevPrice) * 100;
      document.getElementById("priceChange").innerText = `${change.toFixed(3)} (${percent.toFixed(2)}%)`;
    }
    prevPrice = price;
  }
};

// Responsive chart
window.addEventListener('resize', () => chart.applyOptions({ width: chartContainer.clientWidth }));