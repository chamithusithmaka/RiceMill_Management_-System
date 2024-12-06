const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

router.post('/add', async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if the role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists.' });
        }

        const newRole = new Role({ name, description });
        await newRole.save();
        res.status(201).json({ message: 'Role added successfully.', newRole });
    } catch (error) {
        console.error('Error adding role:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
});

// Get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a role by ID
router.get('/:id', async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a role
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;

        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found.' });
        }

        res.status(200).json({ message: 'Role updated successfully.', updatedRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a role
router.delete('/:id', async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        res.status(200).json({ message: 'Role deleted successfully.', deletedRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
