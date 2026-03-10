let running=false

function startBot(){

running=!running

document.getElementById("botStatus")
.innerText = running ? 
"Bot is running" :
"Bot is not running"

}