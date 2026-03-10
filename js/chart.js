// Get chart container
const chartContainer = document.getElementById("chart");

// Create chart
const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 400,
    layout: {
        background: { color: "#0f172a" },
        textColor: "#ffffff",
    },
    grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
    },
    rightPriceScale: { borderColor: "#334155" },
    timeScale: { borderColor: "#334155", timeVisible: true },
});

const candleSeries = chart.addCandlestickSeries({
    upColor: "#22c55e",
    downColor: "#ef4444",
    borderVisible: false,
    wickUpColor: "#22c55e",
    wickDownColor: "#ef4444"
});

// Resize chart on window resize
window.addEventListener("resize", () => {
    chart.resize(chartContainer.clientWidth, 400);
});

// Probability Bars
const barsContainer = document.getElementById("percentageBars");
const values = [9.5, 10.3, 11.3, 9.8, 10.1, 9.7, 10.5, 11.0, 9.9, 10.2];
values.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.innerHTML = index + "<br>" + value + "%";
    bar.style.display = "inline-block";
    bar.style.width = "40px";
    bar.style.margin = "5px";
    bar.style.padding = "6px";
    bar.style.background = "#22c55e";
    bar.style.borderRadius = "6px";
    bar.style.textAlign = "center";
    bar.style.fontSize = "12px";
    barsContainer.appendChild(bar);
});

// Update price display function
function updatePrice(price) {
    const priceEl = document.getElementById("price");
    const changeEl = document.getElementById("change");
    if (priceEl) priceEl.innerText = price.toFixed(3);

    // Update change (dummy calculation for now)
    const change = ((price - 940.518) / 940.518 * 100).toFixed(2);
    if (changeEl) {
        changeEl.innerText = change + "%";
        changeEl.className = change >= 0 ? "ml-2 text-green-400" : "ml-2 text-red-500";
    }
}