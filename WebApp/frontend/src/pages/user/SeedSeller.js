import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar";


function SeedSeller(){
    return(
        
        <div className="SeedSeller-container">
            <Sidebar />
        </div>
    );
}

export default SeedSeller;