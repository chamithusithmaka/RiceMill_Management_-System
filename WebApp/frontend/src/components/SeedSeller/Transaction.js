import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Transaction.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/SeedSeller/SeedSellerHeader";

function Transaction(){

    
    
        return (
            <div className="Transaction-container">
            <Sidebar />
            <div className="Transaction-content">
                <Header />
                <div className="Transaction-main-content">
                </div>
            </div>
        </div>
        );
}

export default Transaction;