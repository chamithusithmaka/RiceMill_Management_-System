import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/EmployeeDetail.css";

function EmployeeDetail() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/employees/employee/${employeeId}`);
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    if (!employee) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="empdetail-container">
            <button className="back-button" onClick={() => window.history.back()}>Back</button>

            <div className="empdetail-header">
                <h2>Employee Detail</h2>
                <p>View the detailed information of <strong>{employee.name}</strong></p>
            </div>

            <div className="empdetail-body">
                <div className="section basic-info">
                    <h3>Basic Information</h3>
                    <p><strong>Name:</strong> {employee.name}</p>
                    <p><strong>Role:</strong> {employee.role}</p>
                    <p><strong>Contact Numbers:</strong> {employee.contactNumbers.join(', ')}</p>
                    <p><strong>Address:</strong> {employee.address}</p>
                    <p><strong>Date of Hire:</strong> {new Date(employee.dateOfHire).toLocaleDateString()}</p>
                </div>

                <div className="section salary-info">
                    <h3>Salary Information</h3>
                    <p><strong>Salary Type:</strong> {employee.salaryType}</p>
                    <p><strong>Salary Amount:</strong> ${employee.salaryAmount}</p>
                </div>

                <div className="section attendance">
                    <h3>Attendance Record</h3>
                    <div className="attendance-list">
                        {employee.attendanceRecord.length > 0 ? (
                            <ul>
                                {employee.attendanceRecord.map((record, index) => (
                                    <li key={index}>
                                        {new Date(record.date).toLocaleDateString()} - 
                                        <span className={record.status === 'Present' ? 'status-present' : 'status-absent'}>
                                            {record.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No attendance record available.</p>
                        )}
                    </div>
                </div>

                <div className="section salary-payments">
                    <h3>Salary Payments</h3>
                    <div className="salary-payment-list">
                        {employee.salaryPayments.length > 0 ? (
                            <ul>
                                {employee.salaryPayments.map((payment, index) => (
                                    <li key={index}>
                                        {payment.paymentMonth} {payment.paymentYear} - 
                                        <span className="amount-paid">${payment.amountPaid}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No salary payment history available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;
