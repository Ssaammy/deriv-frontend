// frontend/js/notifications.js

function showNotification(message, type = "info") {
  const existing = document.getElementById("customNotification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.id = "customNotification";
  notification.className = `notification ${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  // Center screen
  notification.style.position = "fixed";
  notification.style.top = "50%";
  notification.style.left = "50%";
  notification.style.transform = "translate(-50%, -50%)";
  notification.style.padding = "20px 40px";
  notification.style.background = type === "error" ? "#ff4d4f" :
                                  type === "success" ? "#52c41a" : "#1890ff";
  notification.style.color = "#fff";
  notification.style.borderRadius = "8px";
  notification.style.fontSize = "16px";
  notification.style.zIndex = 1000;
  notification.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";

  // Optional sound
  // let audio = new Audio('notification.mp3'); audio.play();

  setTimeout(() => notification.remove(), 3000);
}