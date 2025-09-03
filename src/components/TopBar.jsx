// src/components/TopBar.jsx
import React from "react";
import "./TopBar.css";

function TopBar({ title }) {
  return (
    <div className="topbar">
      <h2>{title}</h2>
      <div className="profile">
        <img src="https://cdn-icons-png.flaticon.com/512/219/219988.png" alt="User" />
        <span>Username</span>
      </div>
    </div>
  );
}

export default TopBar;
