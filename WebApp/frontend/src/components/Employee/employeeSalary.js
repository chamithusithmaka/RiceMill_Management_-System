import React from "react";
import { useNavigate , NavLink } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";
import "../../css/Role.css";


function employeeSalary(){

    return(
        <div className="role-management-container">
            <Sidebar/>
            
            <div className="role-management-content">
            <Header />
                
                <div className="salary-main-content">
                    <h1>
                        Employee salary
                    </h1>

                </div>

            </div>
        </div>
    );

}
export default employeeSalary;
