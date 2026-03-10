// js/chart.js

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

    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },

    rightPriceScale: {
        borderColor: "#334155",
    },

    timeScale: {
        borderColor: "#334155",
        timeVisible: true,
        secondsVisible: true,
    }
});

// Create line series
const lineSeries = chart.addLineSeries({
    color: "#22c55e",
    lineWidth: 2,
});

// Store chart data
let chartData = [];

// Function called by deriv.js when a new price arrives
function updatePrice(price) {

    const time = Math.floor(Date.now() / 1000);

    chartData.push({
        time: time,
        value: price
    });

    lineSeries.setData(chartData);

    // Update price display
    const priceElement = document.getElementById("price");
    if (priceElement) {
        priceElement.innerText = price.toFixed(3);
    }
}

// Resize chart for mobile / responsive
window.addEventListener("resize", () => {
    chart.resize(chartContainer.clientWidth, 400);
});


// ===== Probability Bars =====

const barsContainer = document.getElementById("percentageBars");

if (barsContainer) {

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

}