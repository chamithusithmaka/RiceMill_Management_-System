const express = require('express');
const router = express.Router();
const ProductionBatch = require('../models/ProductionBatch');
const InventoryItem = require('../models/InventoryItem');

// Record a production batch
router.post('/add', async (req, res) => {
    try {
        const { seedType, seedQuantityUsed, riceType, riceProduced } = req.body;

        // Calculate waste
        const waste = seedQuantityUsed - riceProduced;

        // Create production batch record
        const newBatch = new ProductionBatch({ seedType, seedQuantityUsed, riceType, riceProduced, waste });
        await newBatch.save();

        // Update seed inventory
        const seedInventory = await InventoryItem.findOne({ itemType: 'Seed', typeId: seedType });
        if (seedInventory) {
            seedInventory.quantity -= seedQuantityUsed;
            if (seedInventory.quantity < 0) seedInventory.quantity = 0; // Prevent negative inventory
            await seedInventory.save();
        }

        // Update rice inventory
        const riceInventory = await InventoryItem.findOne({ itemType: 'Rice', typeId: riceType });
        if (riceInventory) {
            riceInventory.quantity += riceProduced;
            await riceInventory.save();
        } else {
            // Create rice inventory if it doesn't exist
            const newRiceInventory = new InventoryItem({
                itemType: 'Rice',
                typeId: riceType,
                quantity: riceProduced,
            });
            await newRiceInventory.save();
        }

        res.status(201).json({ message: 'Production batch recorded and inventory updated.', newBatch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all production batches
router.get('/', async (req, res) => {
    try {
        const batches = await ProductionBatch.find().populate('seedType').populate('riceType');
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
