const express = require('express');
const router = express.Router();
const Supply = require('../models/Supply');
const InventoryItem = require('../models/InventoryItem');

// Route to add a new supply
router.post("/add-supply", async (req, res) => {
    try {
        const { supplierName, seedType, pricePerKg, quantity } = req.body;

        // Validate fields
        if (!supplierName || !seedType || !pricePerKg || !quantity) {
            return res.status(400).json({ message: "All fields are required: supplierName, seedType, pricePerKg, and quantity." });
        }

        // Calculate totalAmount
        const totalAmount = pricePerKg * quantity;

        // Create a new supply
        const newSupply = new Supply({
            supplierName,
            seedType,  // Make sure this is the _id of the SeedType document, not the string name
            pricePerKg,
            quantity,
            totalAmount  // Include totalAmount in the Supply document
        });

        const savedSupply = await newSupply.save();
        res.status(201).json({ message: "Supply added successfully", supply: savedSupply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding supply", error: error.message });
    }
});

// Route to get all supplies
router.get("/all-supplies", async (req, res) => {
    try {
        const supplies = await Supply.find().populate("seedType");  // Populate seedType if you need to display the seed name
        res.status(200).json(supplies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching supplies", error: error.message });
    }
});

// Route to delete a supply
router.delete("/delete-supply/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupply = await Supply.findByIdAndDelete(id);
        
        if (!deletedSupply) {
            return res.status(404).json({ message: "Supply not found" });
        }

        res.status(200).json({ message: "Supply deleted successfully", supply: deletedSupply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting supply", error: error.message });
    }
});




module.exports = router;
