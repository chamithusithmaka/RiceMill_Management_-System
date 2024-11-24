const express = require('express');
const router = express.Router();
const Type = require('../models/type');

// Add a new type
router.post('/add', async (req, res) => {
    try {
        const { typeName, description } = req.body;

        // Check if the type already exists
        const existingType = await Type.findOne({ typeName });
        if (existingType) {
            return res.status(400).json({ message: 'Type already exists.' });
        }

        const newType = new Type({ typeName, description });
        await newType.save();
        res.status(201).json({ message: 'Type added successfully.', newType });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all types
router.get('/', async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a type by ID
router.get('/:id', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).json({ message: 'Type not found.' });
        }
        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a type
router.put('/:id', async (req, res) => {
    try {
        const { typeName, description } = req.body;

        const updatedType = await Type.findByIdAndUpdate(
            req.params.id,
            { typeName, description },
            { new: true }
        );

        if (!updatedType) {
            return res.status(404).json({ message: 'Type not found.' });
        }

        res.status(200).json({ message: 'Type updated successfully.', updatedType });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a type
router.delete('/:id', async (req, res) => {
    try {
        const deletedType = await Type.findByIdAndDelete(req.params.id);
        if (!deletedType) {
            return res.status(404).json({ message: 'Type not found.' });
        }
        res.status(200).json({ message: 'Type deleted successfully.', deletedType });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
