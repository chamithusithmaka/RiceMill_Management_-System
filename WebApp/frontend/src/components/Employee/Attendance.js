import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Attendance.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";

function Attendance() {
    const [employees, setEmployees] = useState([]); // Employees to be marked
    const [presentEmployees, setPresentEmployees] = useState([]); // Marked employees

    useEffect(() => {
        const fetchUnmarkedEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/employees/employees/unmarked"); // Fetch unmarked employees
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching unmarked employees:", error);
            }
        };

        const fetchPresentEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/employees/employees/attendance/today"); // Fetch today's attendance
                setPresentEmployees(response.data);
            } catch (error) {
                console.error("Error fetching today's attendance:", error);
            }
        };

        fetchUnmarkedEmployees();
        fetchPresentEmployees();
    }, []);

    const markAttendance = async (employeeId) => {
        try {
            await axios.post("http://localhost:8070/api/employees/employees/attendance/mark", { employeeId }); // Mark attendance

            // Move employee from "Mark Attendance" to "Today's Attendance"
            const markedEmployee = employees.find((emp) => emp._id === employeeId);
            setEmployees(employees.filter((emp) => emp._id !== employeeId)); // Remove from unmarked list
            setPresentEmployees([...presentEmployees, markedEmployee]); // Add to marked list
        } catch (error) {
            console.error("Error marking attendance:", error);
        }
    };

    return (
        <div className="Attendance-container">
            <Sidebar />
            <div className="Attendance-content">
                <Header />
                <div className="Attendance-main">
                    {/* Mark Attendance Section */}
                    <div className="mark-attendance">
                        <h1 className="headers">Mark Attendance</h1>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <div key={employee._id} className="employee-card">
                                    <p>Name: {employee.name}</p>
                                    <p>Role: {employee.role}</p>
                                    <button
                                        className="mark-btn"
                                        onClick={() => markAttendance(employee._id)}
                                    >
                                        Mark Present
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>All employees are marked present!</p>
                        )}
                    </div>

                    {/* Today's Attendance Section */}
                    <div className="Today-attendance">
                        <h1 className="headers">Today's Attendance</h1>
                        {presentEmployees.length > 0 ? (
                            presentEmployees.map((employee) => (
                                <div key={employee._id} className="employee-card">
                                    <p>Name: {employee.name}</p>
                                    <p>Role: {employee.role}</p>
                                    <p>Status: Present</p>
                                </div>
                            ))
                        ) : (
                            <p>No employees marked present yet!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
