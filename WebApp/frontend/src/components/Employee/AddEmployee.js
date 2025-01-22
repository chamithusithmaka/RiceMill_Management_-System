import React, { useState , useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";
import "../../css/AddEmployee.css";



function AddEmployee() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:8070/emproles");
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };
    
    const [employeeData, setEmployeeData] = useState({
        name: "",
        role: "",
        contactNumbers: [""],
        address: "",
        dateOfHire: "",
        salaryType: "Monthly",
        salaryAmount: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleContactNumberChange = (index, value) => {
        const updatedContactNumbers = [...employeeData.contactNumbers];
        updatedContactNumbers[index] = value;
        setEmployeeData({ ...employeeData, contactNumbers: updatedContactNumbers });
    };

    const addContactNumberField = () => {
        setEmployeeData({
            ...employeeData,
            contactNumbers: [...employeeData.contactNumbers, ""],
        });
    };

    const removeContactNumberField = (index) => {
        const updatedContactNumbers = employeeData.contactNumbers.filter(
            (_, i) => i !== index
        );
        setEmployeeData({ ...employeeData, contactNumbers: updatedContactNumbers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/api/employees/add-employee", employeeData);

            alert("Employee added successfully!");
            setEmployeeData({
                name: "",
                role: "",
                contactNumbers: [""],
                address: "",
                dateOfHire: "",
                salaryType: "Monthly",
                salaryAmount: "",
            });
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee.");
        }
    };

    return (
        <div className="AddEmployee-container">
  <Sidebar />

  <div className="AddEmployee-content">
    <Header />

    <div className="AddEmployee-main-content">
      <h1 className="title">Register New Employee</h1>

      <form className="AddEmployee-form" onSubmit={handleSubmit}>
        
        {/* Left Section */}
        <div className="form-section left">
          <div className="form-group">
            <label htmlFor="name">Employee Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter employee name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={employeeData.role}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfHire">Date of Hire</label>
            <input
              type="date"
              id="dateOfHire"
              name="dateOfHire"
              value={employeeData.dateOfHire}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="salaryType">Salary Type</label>
            <select
              id="salaryType"
              name="salaryType"
              value={employeeData.salaryType}
              onChange={handleInputChange}
            >
              <option value="Monthly">Monthly</option>
              <option value="Daily">Daily</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="form-section right">
          <div className="form-group">
            <label>Contact Numbers</label>
            {employeeData.contactNumbers.map((number, index) => (
              <div key={index} className="contact-number-group">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => handleContactNumberChange(index, e.target.value)}
                  placeholder="Enter contact number"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeContactNumberField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-contact-button"
              onClick={addContactNumberField}
            >
              Add Contact Number
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={employeeData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="salaryAmount">Salary Amount</label>
            <input
              type="number"
              id="salaryAmount"
              name="salaryAmount"
              value={employeeData.salaryAmount}
              onChange={handleInputChange}
              required
              placeholder="Enter salary amount"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-button">
          <button type="submit">Register Employee</button>
        </div>
      </form>
    </div>
  </div>
</div>



    );
    
}

export default AddEmployee;
