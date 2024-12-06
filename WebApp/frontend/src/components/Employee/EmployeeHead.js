// Header.js
import React from "react";
import { useNavigate , NavLink } from "react-router-dom";
import "../../css/EmployeeHead.css";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="header-container">

            <NavLink to="/employee" exact activeClassName="active-link">
            <button className="header-button" onClick={() => navigate("/employee-roles")}>
                Employees
            </button>
            </NavLink>

            <NavLink to="/role" exact activeClassName="active-link">
            <button className="header-button" onClick={() => navigate("/employee-roles")}>
                Employee Roles
            </button>
            </NavLink>
            
            <NavLink to ="/addemployee" exact activeClassName = "active-link">
            <button className="header-button" onClick={() => navigate("/add-employee")}>
                Add Employees
            </button>
            </NavLink>
            <button className="header-button" onClick={() => navigate("/view-attendance")}>
                View Employee Attendance
            </button>
        </div>
    );
}

export default Header;
