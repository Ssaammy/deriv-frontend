const ws = new WebSocket(
"wss://ws.binaryws.com/websockets/v3?app_id=1089"
)

ws.onopen = function(){

ws.send(JSON.stringify({

ticks:"R_100"

}))

}

ws.onmessage = function(msg){

const data = JSON.parse(msg.data)

if(data.tick){

updatePrice(data.tick.quote)

}

}