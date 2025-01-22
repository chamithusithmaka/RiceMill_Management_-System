import React from "react";
import { useNavigate , NavLink } from "react-router-dom";
import "../../css/EmployeeHead.css";


function SellerHeader(){
        return (
            <div className="header-container">
    
                <NavLink to="/addseller" exact activeClassName="active-link">
                <button className="header-button">
                    Add Seller
                </button>
                </NavLink>
    
                <NavLink to="/allsellers" exact activeClassName="active-link">
                <button className="header-button" >
                    All Sellers
                </button>
                </NavLink>
                
                <NavLink to ="/transaction" exact activeClassName = "active-link">
                <button className="header-button" >
                    Transaction
                </button>
                </NavLink>
            </div>
        );
}

export default SellerHeader;