import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Supply/SupplyHeader";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";

function Supply(){
    return(
        <div className="employee-container">
            <Sidebar />
            <div className="employee-content">
                <Header />
                <div className="employee-main-content">
                    
                </div>
            </div>
        </div>
    )
}
export default Supply;

