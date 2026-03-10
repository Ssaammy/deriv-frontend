import React from "react";
import "../../CSS/dashboard.css"; // ensure you style cards here

export default function CardTile({ title, description, color }) {
  return (
    <div className="card-tile" style={{ borderColor: color }}>
      <h3 style={{ color }}>{title}</h3>
      <p>{description}</p>
      <button style={{ backgroundColor: color, border: "none" }}>Open</button>
    </div>
  );
}