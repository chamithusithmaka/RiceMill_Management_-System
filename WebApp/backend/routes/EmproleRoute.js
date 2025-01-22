const express = require('express');
const router = express.Router();
const Emprole = require('../models/EmpRole'); // Update the path if needed

// Route to create a new employee role
router.post('/add', async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if the role already exists
        const existingRole = await Emprole.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'Role with this name already exists' });
        }

        // Create and save the new role
        const newRole = new Emprole({ name, description });
        await newRole.save();

        res.status(201).json({ message: 'Employee role created successfully', newRole });
    } catch (error) {
        res.status(400).json({ message: 'Error creating employee role', error });
    }
});

// Route to fetch all employee roles
router.get('/', async (req, res) => {
    try {
        const roles = await Emprole.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee roles', error });
    }
});

// Route to fetch a specific employee role by ID
router.get('/:id', async (req, res) => {
    try {
        const role = await Emprole.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role', error });
    }
});

// Route to update a specific employee role by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedRole = await Emprole.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', updatedRole });
    } catch (error) {
        res.status(400).json({ message: 'Error updating role', error });
    }
});

// Route to delete a specific employee role by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRole = await Emprole.findByIdAndDelete(req.params.id);

        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully', deletedRole });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error });
    }
});

// Export the router
module.exports = router;
