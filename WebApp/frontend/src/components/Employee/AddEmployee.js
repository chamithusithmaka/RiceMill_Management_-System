import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";
import "../../css/AddEmployee.css"

function AddEmployee (){

    return(
        <div className="AddEmployee-container">

            <Sidebar />

            <div className="AddEmployee-content">
                <Header />
            </div>
            
        </div>  
    );

}

export default AddEmployee;
