import React from "react";
import "../../CSS/style.css"; // your main CSS

export default function Header() {
  return (
    <header className="header-container">
      <div className="logo">
        <h1>Binary Tool</h1>
        <span className="powered-by">Powered by Deriv</span>
      </div>
      <nav className="nav-links">
        <button className="nav-btn">Log in</button>
        <button className="nav-btn">Sign up</button>
        <button className="nav-btn">API Token</button>
      </nav>
    </header>
  );
}