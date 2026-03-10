// chart.js

const canvas = document.getElementById("audChart");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Values array (chart data)
let values = [940.518];

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2;
    values.forEach((v, i) => {
        const x = i * (canvas.width / values.length);
        const y = canvas.height - (v - 940.525) * (canvas.height / 0.1); // narrow range
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
}

// Simulate initial chart update (before Deriv WS)
function updateChartSimulated() {
    let last = values[values.length - 1];
    let change = (Math.random() - 0.5) / 50;
    let newVal = Math.max(940.525, Math.min(940.625, last + change));
    values.push(newVal);
    if (values.length > 100) values.shift();

    document.getElementById("currentVal").innerText = newVal.toFixed(3);
    let percent = ((newVal - 940.518) / 940.518 * 100).toFixed(3);
    document.getElementById("percentageChange").innerText = `${percent >= 0 ? '+' : ''}${percent} (${percent}%)`;

    drawChart();
}

// Initial percentage bars
const percVals = [9.5, 10.3, 11.3, 9.8, 10.1, 9.7, 10.5, 11.0, 9.9, 10.2];
const percContainer = document.getElementById("percBars");
percVals.forEach(v => {
    const div = document.createElement("div");
    div.style.height = v * 2 + "px";
    div.innerText = v + "%";
    percContainer.appendChild(div);
});

// Use simulated chart until Deriv WS ticks arrive
setInterval(updateChartSimulated, 500);

// Function to add live tick from Deriv WS
function addTickToChart(price) {
    values.push(price);
    if (values.length > 100) values.shift();
    drawChart();

    document.getElementById("currentVal").innerText = price.toFixed(3);
    let percent = ((price - 940.518) / 940.518 * 100).toFixed(3);
    document.getElementById("percentageChange").innerText = `${percent >= 0 ? '+' : ''}${percent} (${percent}%)`;
}