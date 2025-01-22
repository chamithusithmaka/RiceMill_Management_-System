import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/AddSupply.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Supply/SupplyHeader";

function AddSupply() {
    const [suppliers, setSuppliers] = useState([]);
    const [seedTypes, setSeedTypes] = useState([]);
    const [formData, setFormData] = useState({
        supplierName: "",
        seedType: "",
        pricePerKg: "",
        quantity: "",
        totalPrice: 0,  // To store the calculated total price
        isGrams: false, // To track if the unit is grams
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch suppliers and seed types
        const fetchData = async () => {
            try {
                const supplierResponse = await axios.get("http://localhost:8070/api/seed-sellers");
                const seedTypeResponse = await axios.get("http://localhost:8070/types");

                // Check and log data structure
                console.log("Fetched Suppliers:", supplierResponse.data);
                console.log("Fetched Seed Types:", seedTypeResponse.data);

                // Ensure the response structure matches what you expect
                if (supplierResponse.data) {
                    setSuppliers(supplierResponse.data);
                }
                if (seedTypeResponse.data) {
                    setSeedTypes(seedTypeResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => {
            const updatedFormData = { ...prevState, [name]: value };
            
            // Calculate total price considering grams or kilograms
            if (name === "pricePerKg" || name === "quantity") {
                let totalPrice = parseFloat(updatedFormData.pricePerKg) * parseFloat(updatedFormData.quantity);
                
                if (updatedFormData.isGrams && updatedFormData.quantity && updatedFormData.pricePerKg) {
                    totalPrice = totalPrice / 1000; // Convert grams to kg if needed
                }

                updatedFormData.totalPrice = totalPrice.toFixed(2);  // Round the total price
            }

            return updatedFormData;
        });
    };

    const handleUnitChange = (e) => {
        const isGrams = e.target.value === "grams";
        setFormData((prevState) => ({
            ...prevState,
            isGrams: isGrams,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/add-supply", formData);
            setMessage("Supply added successfully!");
            setFormData({
                supplierName: "",
                seedType: "",
                pricePerKg: "",
                quantity: "",
                totalPrice: 0,
                isGrams: false,  // Reset unit to kg after submission
            });
        } catch (error) {
            console.error("Error adding supply", error);
            setMessage("Failed to add supply. Please try again.");
        }
    };

    return (
        <div className="AddSupply-container">
            <Sidebar />
            <div className="AddSupply-content">
                <Header />
                <div className="AddSupply-main-content">
                    <h2>Add New Supply</h2>
                    {message && <div className="message">{message}</div>}
                    <form onSubmit={handleSubmit} className="add-supply-form">
                        <div className="form-group">
                            <label htmlFor="supplierName">Supplier Name</label>
                            <select
                                id="supplierName"
                                name="supplierName"
                                value={formData.supplierName}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select Supplier</option>
                                {suppliers.length > 0 ? (
                                    suppliers.map((supplier) => (
                                        <option key={supplier._id} value={supplier.name}>
                                            {supplier.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No suppliers available</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="seedType">Seed Type</label>
                            <select
                                id="seedType"
                                name="seedType"
                                value={formData.seedType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select Seed Type</option>
                                {seedTypes.length > 0 ? (
                                    seedTypes.map((type) => (
                                        <option key={type._id} value={type._id}>
                                            {type.typeName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No seed types available</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="pricePerKg">Price Per Kg</label>
                            <input
                                type="number"
                                id="pricePerKg"
                                name="pricePerKg"
                                value={formData.pricePerKg}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter price per kg"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter quantity"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="unit">Unit</label>
                            <select
                                id="unit"
                                name="unit"
                                onChange={handleUnitChange}
                                value={formData.isGrams ? "grams" : "kg"}
                            >
                                <option value="kg">Kilograms</option>
                                <option value="grams">Grams</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="totalPrice">Total Price</label>
                            <input
                                type="number"
                                id="totalPrice"
                                name="totalPrice"
                                value={formData.totalPrice}
                                readOnly
                                placeholder="Total price will be calculated"
                            />
                        </div>

                        <button type="submit" className="submit-button">Add Supply</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSupply;
