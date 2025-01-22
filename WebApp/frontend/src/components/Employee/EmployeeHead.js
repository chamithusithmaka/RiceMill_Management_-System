// Header.js
import React from "react";
import { useNavigate , NavLink } from "react-router-dom";
import "../../css/EmployeeHead.css";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="header-container">

            <NavLink to="/employee" exact activeClassName="active-link">
            <button className="header-button">
                Employees
            </button>
            </NavLink>

            <NavLink to="/role" exact activeClassName="active-link">
            <button className="header-button" >
                Employee Roles
            </button>
            </NavLink>
            
            <NavLink to ="/addemployee" exact activeClassName = "active-link">
            <button className="header-button" >
                Add Employees
            </button>
            </NavLink>
            <NavLink to="/attendance">
            <button className="header-button" >
                Employee Attendance
            </button>
            </NavLink>
        </div>
    );
}

export default Header;
