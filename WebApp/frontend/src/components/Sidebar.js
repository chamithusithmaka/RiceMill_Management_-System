import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaClipboardList, FaCog, FaBars } from "react-icons/fa";
import "../css/Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">{!isCollapsed && "Rice Mill System"}</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="sidebar-menu">
          <NavLink to="/" exact activeClassName="active-link">
            <li className="menu-item">
              <FaHome />
              {!isCollapsed && <span>Dashboard</span>}
            </li>
          </NavLink>
          <NavLink to="/SeedSeller" activeClassName="active-link">
            <li className="menu-item">
              <FaUsers />
              {!isCollapsed && <span>Seed Seller Management</span>}
            </li>
          </NavLink>
          <NavLink to="/employee" activeClassName="active-link">
            <li className="menu-item">
              <FaClipboardList />
              {!isCollapsed && <span>Employee Management</span>}
            </li>
          </NavLink>
          <NavLink to="/Settings" activeClassName="active-link">
            <li className="menu-item">
              <FaCog />
              {!isCollapsed && <span>Settings</span>}
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
