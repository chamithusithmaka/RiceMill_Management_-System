import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";
import "../../css/Employee.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        contactNumbers: [""],
        address: "",
        salaryType: "",
        salaryAmount: "",
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:8070/emproles");
                setRoles(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/employees/employees");
                setEmployees(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchRoles();
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/api/employees/employee/${id}`);
            setEmployees(employees.filter((employee) => employee._id !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setFormData({
            name: employee.name,
            role: employee.role ? employee.role : "",
            contactNumbers: employee.contactNumbers || [""],
            address: employee.address || "",
            salaryType: employee.salaryType || "",
            salaryAmount: employee.salaryAmount || "",
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async () => {
        if (!formData.name || !formData.role || !formData.salaryType || !formData.salaryAmount) {
            alert("Please fill all the required fields");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8070/api/employees/employee/${currentEmployee._id}`,
                formData
            );
            const updatedEmployee = response.data.employee;
            setEmployees((prev) =>
                prev.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
            );
            setShowModal(false);
            setCurrentEmployee(null);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <div className="employee-container">
            <Sidebar />
            <div className="employee-content">
                <Header />
                <div className="employee-main-content">
                    <h2>Employee List</h2>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Contact Number</th>
                                <th>Hire Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee._id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.role ? employee.role : "N/A"}</td>
                                    <td>{employee.contactNumbers.join(", ")}</td>
                                    <td>{new Date(employee.dateOfHire).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/employee/${employee._id}`} className="view-button">View</Link>
                                        <button onClick={() => handleEdit(employee)} className="update-button">Update</button>
                                        <button onClick={() => handleDelete(employee._id)} className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for Updating Employee */}
{showModal && (
    <div className="modal-overlay">
        <div className="modal-box">
            <h3 className="modal-title">Update Employee</h3>
            <form className="modal-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleFormChange}
                        className="form-control"
                    >
                        <option value="" disabled>Select Role</option>
                        {roles.map((role , employee) => (
                            <option key={role._id} value={role.name} text={employee.role}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Contact Numbers:</label>
                    <input
                        type="text"
                        name="contactNumbers"
                        value={formData.contactNumbers.join(", ")}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                contactNumbers: e.target.value.split(","),
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Salary Type:</label>
                    <select
                        name="salaryType"
                        value={formData.salaryType}
                        onChange={handleFormChange}
                        className="form-control"
                    >
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Salary Amount:</label>
                    <input
                        type="number"
                        name="salaryAmount"
                        value={formData.salaryAmount}
                        onChange={handleFormChange}
                        className="form-control"
                    />
                </div>
                <div className="modal-actions">
                    <button type="button" onClick={handleFormSubmit} className="btn-save">
                        Save
                    </button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}

            </div>
        </div>
    );
}

export default Employee;
