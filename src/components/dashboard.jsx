import React from "react";
import CardTile from "./CardTile";
import "../../CSS/dashboard.css"; // optional, your existing dashboard styles

export default function Dashboard() {
  const cards = [
    {
      title: "Market Analysis",
      description: "Real-time insights into price movements",
      color: "#0ff", // cyan glow
    },
    {
      title: "Portfolio",
      description: "Track performance of assets",
      color: "#ff0", // yellow glow
    },
    {
      title: "Instant Exec",
      description: "Lightning-fast trade execution",
      color: "#f0f", // magenta glow
    },
  ];

  return (
    <div className="dashboard-container">
      {cards.map((card, index) => (
        <CardTile
          key={index}
          title={card.title}
          description={card.description}
          color={card.color}
        />
      ))}
    </div>
  );
}