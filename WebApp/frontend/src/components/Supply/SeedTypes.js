import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Role.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Supply/SupplyHeader";

function SeedType(){
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
export default SeedType;