const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Role = require('../models/Role'); // Assuming roles are managed in a separate model

// Add a new employee
router.post('/add', async (req, res) => {
    try {
        const { name, role, contactNumber, address, dateOfHire } = req.body;

        // Check if the role exists
        const roleExists = await Role.findById(role);
        if (!roleExists) {
            return res.status(404).json({ message: 'Role not found.' });
        }

        const newEmployee = new Employee({ name, role, contactNumber, address, dateOfHire });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully.', newEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().populate('role');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('role');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an employee
router.put('/:id', async (req, res) => {
    try {
        const { name, role, contactNumber, address, dateOfHire } = req.body;

        // Check if the role exists
        if (role) {
            const roleExists = await Role.findById(role);
            if (!roleExists) {
                return res.status(404).json({ message: 'Role not found.' });
            }
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, role, contactNumber, address, dateOfHire },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.', deletedEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add attendance record for an employee
router.post('/:id/attendance', async (req, res) => {
    try {
        const { date, status } = req.body; // status can be "Present", "Absent", etc.
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        employee.attendanceRecord.push({ date, status });
        await employee.save();

        res.status(200).json({ message: 'Attendance record added successfully.', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update performance metrics for an employee
router.put('/:id/performance', async (req, res) => {
    try {
        const { performanceMetrics } = req.body;
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        employee.performanceMetrics = performanceMetrics;
        await employee.save();

        res.status(200).json({ message: 'Performance metrics updated successfully.', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
