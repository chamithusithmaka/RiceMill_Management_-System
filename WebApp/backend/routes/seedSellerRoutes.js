const express = require('express');
const router = express.Router();
const SeedSeller = require('../models/SeedSeller');

// Add a new seed seller
router.post('/add', async (req, res) => {
    try {
        const { name, contactNumber, email, address, transactionHistory } = req.body;

        // Check if the seed seller already exists
        const existingSeller = await SeedSeller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seed seller with this email already exists.' });
        }

        const newSeedSeller = new SeedSeller({
            name,
            contactNumber,
            email,
            address,
            transactionHistory,
        });

        await newSeedSeller.save();
        res.status(201).json({ message: 'Seed seller added successfully.', newSeedSeller });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/transactions/:sellerId', async (req, res) => {
    try {
        // Extract sellerId from URL params
        const { sellerId } = req.params;

        // Find the seed seller by ID
        const seedSeller = await SeedSeller.findById(sellerId);

        if (!seedSeller) {
            return res.status(404).json({ message: 'Seed seller not found.' });
        }

        // Send the transaction history back as a response
        res.status(200).json({ transactions: seedSeller.transactionHistory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get all seed sellers
router.get('/', async (req, res) => {
    try {
        const seedSellers = await SeedSeller.find();
        res.status(200).json(seedSellers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a seed seller by ID
router.get('/:id', async (req, res) => {
    try {
        const seedSeller = await SeedSeller.findById(req.params.id);
        if (!seedSeller) {
            return res.status(404).json({ message: 'Seed seller not found.' });
        }
        res.status(200).json(seedSeller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a seed seller
router.put('/:id', async (req, res) => {
    try {
        const { name, contactNumber, email, address, transactionHistory } = req.body;

        const updatedSeedSeller = await SeedSeller.findByIdAndUpdate(
            req.params.id,
            { name, contactNumber, email, address, transactionHistory },
            { new: true }
        );

        if (!updatedSeedSeller) {
            return res.status(404).json({ message: 'Seed seller not found.' });
        }

        res.status(200).json({ message: 'Seed seller updated successfully.', updatedSeedSeller });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a seed seller
router.delete('/:id', async (req, res) => {
    try {
        const deletedSeedSeller = await SeedSeller.findByIdAndDelete(req.params.id);
        if (!deletedSeedSeller) {
            return res.status(404).json({ message: 'Seed seller not found.' });
        }
        res.status(200).json({ message: 'Seed seller deleted successfully.', deletedSeedSeller });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
