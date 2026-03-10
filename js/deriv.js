// Place trades using Deriv API via WebSocket
// Uses userApiToken from account.js

let tradeWs = null;

// Connect trade WebSocket
function connectTradeWs() {
    if (!window.userApiToken) {
        console.warn('No API token. Please log in.');
        return;
    }

    if (tradeWs) tradeWs.close();

    tradeWs = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=1089&l=${window.userApiToken}`);

    tradeWs.onopen = () => console.log('Connected to Deriv WebSocket for trading');

    tradeWs.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.error) {
            console.error('Trade error:', data.error);
            alert(`Trade Error: ${data.error.message}`);
        } else if (data.proposal_open_contract) {
            console.log('Trade placed successfully:', data.proposal_open_contract);
            alert('Trade executed successfully!');
        }
    };

    tradeWs.onerror = (err) => console.error('Trade WebSocket error:', err);

    tradeWs.onclose = () => console.log('Trade WebSocket closed');
}

// Function to place trade
function placeTrade(type) {
    if (!window.userApiToken) {
        alert('Please log in and enter API token before trading.');
        return;
    }

    const symbol = document.getElementById('symbolSelector').value;
    const amount = parseFloat(document.getElementById('tradeAmount').value);
    const stopLoss = parseFloat(document.getElementById('stopLoss').value);
    const takeProfit = parseFloat(document.getElementById('takeProfit').value);

    if (!symbol || !amount || amount <= 0) {
        alert('Please enter valid trade symbol and amount.');
        return;
    }

    // Connect WS if not connected
    if (!tradeWs || tradeWs.readyState !== WebSocket.OPEN) {
        connectTradeWs();
        setTimeout(() => executeTrade(type, symbol, amount, stopLoss, takeProfit), 500); // wait for connection
    } else {
        executeTrade(type, symbol, amount, stopLoss, takeProfit);
    }
}

function executeTrade(type, symbol, amount, stopLoss, takeProfit) {
    if (!tradeWs || tradeWs.readyState !== WebSocket.OPEN) {
        alert('Trade WebSocket not connected.');
        return;
    }

    // For simplicity, we’ll open a BINARY option contract (1 tick) as example
    const tradeData = {
        buy: 1,
        price: amount,
        parameters: {
            contract_type: type.toUpperCase(), // 'BUY' or 'SELL'
            symbol: symbol,
            duration: 1, // 1 minute
            duration_unit: 'm',
            currency: 'USD',
            barrier: null,
            stop_loss: stopLoss || null,
            take_profit: takeProfit || null
        }
    };

    tradeWs.send(JSON.stringify({ buy: tradeData.buy, price: tradeData.price, parameters: tradeData.parameters }));
}