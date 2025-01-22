const express = require('express');
const router = express.Router();
const Type = require('../models/type');

/**
 * Route: Add a new type
 * Method: POST
 * Endpoint: /types
 */
router.post('/types', async (req, res) => {
    try {
        const { typeName } = req.body;

        // Validate input
        if (!typeName) {
            return res.status(400).json({ message: "Type name is required" });
        }

        // Check for duplicates
        const existingType = await Type.findOne({ typeName });
        if (existingType) {
            return res.status(409).json({ message: "Type already exists" });
        }

        // Create and save the type
        const newType = new Type({ typeName });
        const savedType = await newType.save();

        res.status(201).json({ message: "Type added successfully", type: savedType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add type", error: error.message });
    }
});

/**
 * Route: View all types
 * Method: GET
 * Endpoint: /types
 */
router.get('/types', async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch types", error: error.message });
    }
});

/**
 * Route: Delete a type by ID
 * Method: DELETE
 * Endpoint: /types/:id
 */
router.delete('/types/:id', async (req, res) => {
    try {
        const deletedType = await Type.findByIdAndDelete(req.params.id);

        if (!deletedType) {
            return res.status(404).json({ message: "Type not found" });
        }

        res.status(200).json({ message: "Type deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete type", error: error.message });
    }
});

module.exports = router;
