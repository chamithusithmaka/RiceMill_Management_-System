import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Role.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Employee/EmployeeHead";

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [editingRole, setEditingRole] = useState(null); // Track role to edit

    // Fetch roles
    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:8070/roles");
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    // Add or Update role
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRole) {
                // Update role
                const response = await axios.put(`http://localhost:8070/roles/${editingRole._id}`, { name: roleName, description });
                setMessage(response.data.message);
                setEditingRole(null); // Reset editing state
            } else {
                // Add role
                const response = await axios.post("http://localhost:8070/roles/add", { name: roleName, description });
                setMessage(response.data.message);
            }

            // Reset form
            setRoleName("");
            setDescription("");
            fetchRoles(); // Refresh the roles list
        } catch (error) {
            console.error("Error adding/updating role:", error);
        }
    };

    // Start editing a role
    const handleEdit = (role) => {
        setRoleName(role.name);
        setDescription(role.description);
        setEditingRole(role);
    };

    // Delete a role
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8070/roles/${id}`);
            setMessage(response.data.message);
            fetchRoles(); // Refresh the roles list
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="role-management-container">
            <Sidebar /> {/* Sidebar placed on the left */}
            <div className="role-management-content">
                <Header /> {/* Header placed at the top */}
                <div className="role-management-main-content">
                    <div className="role-content-wrapper">
                        {/* Left side for form */}
                        <div className="role-form-section">
                            <h1 className="title">{editingRole ? "Edit Role" : "Manage Roles"}</h1>
                            <form className="role-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="roleName">Role Name</label>
                                    <input
                                        type="text"
                                        id="roleName"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                        placeholder="Enter role name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description"
                                    />
                                </div>
                                <button type="submit" className="btn-add-role">{editingRole ? "Update Role" : "Add Role"}</button>
                                {message && <p className="message">{message}</p>}
                            </form>
                        </div>

                        {/* Right side for displaying roles */}
                        <div className="role-display-section">
                            <h2>Existing Roles</h2>
                            {roles.length > 0 ? (
                                <ul>
                                    {roles.map((role) => (
                                        <li key={role._id} className="role-item">
                                            <strong>{role.name}</strong>: {role.description || "No description"}
                                            <button onClick={() => handleEdit(role)} className="btn-edit-role">Edit</button>
                                            <button onClick={() => handleDelete(role._id)} className="btn-delete-role">Delete</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No roles added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;
