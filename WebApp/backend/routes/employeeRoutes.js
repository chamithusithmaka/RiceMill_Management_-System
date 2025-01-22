const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Route to add a new employee
router.post('/add-employee', async (req, res) => {
    try {
        const {
            name,
            role,
            contactNumbers,
            address,
            dateOfHire,
            salaryType,
            salaryAmount
        } = req.body;

        // Basic validation
        if (!name || !role || !salaryType || !salaryAmount) {
            return res.status(400).json({ message: "Please provide all required fields: name, role, salaryType, and salaryAmount." });
        }

        // Create a new Employee instance
        const newEmployee = new Employee({
            name,
            role,
            contactNumbers, // Optional, can be empty or an array
            address, // Optional
            dateOfHire: dateOfHire || new Date(), // Default to current date if not provided
            salaryType,
            salaryAmount
        });

        // Save the new employee to the database
        const savedEmployee = await newEmployee.save();

        res.status(201).json({ message: "Employee registered successfully", employee: savedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while registering the employee", error: error.message });
    }
});

// Route to get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find().populate('role'); // Populating 'role' reference
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employees', error: err });
    }
});

// Route to get a specific employee by ID
router.get('/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('role');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employee', error: err });
    }
});

// Route to delete an employee by ID (already added)
router.delete('/employee/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting employee', error: err });
    }
});

// Route to update an existing employee by ID (already added)
router.put('/employee/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json({ message: 'Employee updated', employee: updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Error updating employee', error: err });
    }
});

//attendance 
// Get today's attendance
router.get("/employees/attendance/today", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const employeesWithAttendance = await Employee.find({
            "attendanceRecord.date": today,
            "attendanceRecord.status": "Present",
        });

        res.json(employeesWithAttendance);
    } catch (error) {
        res.status(500).json({ message: "Error fetching today's attendance." });
    }
});

// Mark attendance
router.post("/employees/attendance/mark", async (req, res) => {
    const { employeeId } = req.body;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Check if already marked present
        const alreadyMarked = employee.attendanceRecord.some(
            (record) => record.date.getTime() === today.getTime()
        );

        if (alreadyMarked) {
            return res.status(400).json({ message: "Attendance already marked for today." });
        }

        // Add attendance record
        employee.attendanceRecord.push({ date: today, status: "Present" });
        await employee.save();

        res.json({ message: "Attendance marked successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error marking attendance." });
    }
});

// Get employees who have not been marked present today
router.get('/employees/unmarked', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize time to midnight

        const unmarkedEmployees = await Employee.find({
            $or: [
                { attendanceRecord: { $exists: false } }, // No attendance record
                {
                    attendanceRecord: {
                        $not: {
                            $elemMatch: {
                                date: today,
                                status: 'Present',
                            },
                        },
                    },
                },
            ],
        });

        res.status(200).json(unmarkedEmployees);
    } catch (error) {
        console.error('Error fetching unmarked employees:', error);
        res.status(500).json({ message: 'Failed to fetch unmarked employees.' });
    }
});




module.exports = router;
