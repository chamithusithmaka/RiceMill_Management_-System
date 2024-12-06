import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";
import "../../css/Employee.css";

function Employee() {
    return (
        <div className="employee-container">
            <Sidebar />
            <div className="employee-content">
                <Header />
                <div className="employee-main-content">
                    {/* Additional content for Employee page goes here */}
                </div>
            </div>
        </div>
    );
}

export default Employee;
