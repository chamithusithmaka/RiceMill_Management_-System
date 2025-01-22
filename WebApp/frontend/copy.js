import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/AllSupply.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Supply/SupplyHeader";

function AllSupply(){

    
    
        return (
            <div className="allsupply-container">
            <Sidebar />
            <div className="allsupply-content">
                <Header />
                <div className="allsupply-main-content">
                </div>
            </div>
        </div>
        );
}

export default AllSupply;