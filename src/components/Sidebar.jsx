// Sidebar.jsx (manual page control)
import React from "react";
import { FaThList, FaMusic, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ setActivePage }) {
  const handleLogout = () => {
    // Just reload to simulate logout or redirect to login manually
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-heading">AUDIOSED</h2>

        <nav className="sidebar-nav">
          <button className="sidebar-link" onClick={() => setActivePage("genre")}>
            <FaThList className="sidebar-icon" />
            <span>Genre</span>
          </button>
          <button className="sidebar-link" onClick={() => setActivePage("audiopacks")}>
            <FaMusic className="sidebar-icon" />
            <span>AudioPacks</span>
          </button>
        </nav>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;
