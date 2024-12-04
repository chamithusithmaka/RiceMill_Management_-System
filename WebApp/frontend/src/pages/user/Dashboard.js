import React from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* Add your dashboard content here */}
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
