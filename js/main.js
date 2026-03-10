let botRunning=false;
function toggleBot(){
  botRunning=!botRunning;
  document.getElementById("botStatus").innerText=botRunning?"Bot is running":"Bot is not running";
  document.querySelector(".run-btn").innerText=botRunning?"Stop":"Run";
}

function selectMode(mode){
  alert("Selected: "+mode);
}