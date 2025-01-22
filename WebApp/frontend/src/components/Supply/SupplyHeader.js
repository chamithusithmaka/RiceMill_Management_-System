import React from "react";
import { useNavigate , NavLink } from "react-router-dom";
import "../../css/EmployeeHead.css";


function SupplyHeader(){

    const navigate = useNavigate();
    
        return (
            <div className="header-container">
    
                <NavLink to="/employee" exact activeClassName="active-link">
                <button className="header-button">
                    Add Supply
                </button>
                </NavLink>
    
                {/* <NavLink to="/seedType" exact activeClassName="active-link">
                <button className="header-button" >
                    Seed Types
                </button>
                </NavLink> */}
                
                <NavLink to ="/addemployee" exact activeClassName = "active-link">
                <button className="header-button" >
                    History
                </button>
                </NavLink>
            </div>
        );
}

export default SupplyHeader;