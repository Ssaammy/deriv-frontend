import React from "react";
import "../../CSS/style.css"; // your main CSS

export default function Footer() {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} Binary Tool. All Rights Reserved.</p>
      <p className="status">Connecting to live markets...</p>
    </footer>
  );
}