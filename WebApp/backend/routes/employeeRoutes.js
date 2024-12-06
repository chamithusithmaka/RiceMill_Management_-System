const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Route: Create a new employee
router.post('/employees', async (req, res) => {
    const { name, role, contactNumber, address, salaryType, salaryAmount } = req.body;

    try {
        const newEmployee = new Employee({
            name,
            role,
            contactNumber,
            address,
            salaryType,
            salaryAmount,
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
});

// Route: Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find().populate('role'); // Populate the role reference
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});

// Route: Get a single employee by ID
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('role');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
});

// Route: Update an employee by ID
router.put('/employees/:id', async (req, res) => {
    const { name, role, contactNumber, address, salaryType, salaryAmount } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, role, contactNumber, address, salaryType, salaryAmount },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
});

// Route: Delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

// Route: Mark attendance for an employee
router.post('/employees/:id/attendance', async (req, res) => {
    const { date, status } = req.body;

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Add attendance record
        employee.attendanceRecord.push({ date: new Date(date), status });
        await employee.save();

        res.status(200).json({ message: 'Attendance marked successfully', attendance: employee.attendanceRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
});

// Route: Get attendance for an employee
router.get('/employees/:id/attendance', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ attendance: employee.attendanceRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
});

// Route: Calculate total salary for an employee based on attendance (if daily salary)
router.get('/employees/:id/salary', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        let totalSalary = 0;
        if (employee.salaryType === 'Daily') {
            // Count the number of "Present" days
            const presentDays = employee.attendanceRecord.filter(record => record.status === 'Present').length;
            totalSalary = presentDays * employee.salaryAmount;
        } else if (employee.salaryType === 'Monthly') {
            totalSalary = employee.salaryAmount; // Fixed monthly salary
        }

        res.status(200).json({ totalSalary });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating salary', error: error.message });
    }
});

module.exports = router;
