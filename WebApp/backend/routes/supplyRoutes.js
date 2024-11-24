const express = require('express');
const router = express.Router();
const Supply = require('../models/Supply');
const InventoryItem = require('../models/InventoryItem');

// Add new supply
router.post('/add', async (req, res) => {
    try {
        const { supplierId, seedType, quantity, price } = req.body;

        // Create a new supply record
        const newSupply = new Supply({ supplierId, seedType, quantity, price });
        await newSupply.save();

        // Update seed inventory
        const inventory = await InventoryItem.findOne({ itemType: 'Seed', typeId: seedType });
        if (inventory) {
            inventory.quantity += quantity;
            await inventory.save();
        } else {
            // Create a new inventory item if it doesn't exist
            const newInventory = new InventoryItem({
                itemType: 'Seed',
                typeId: seedType,
                quantity,
            });
            await newInventory.save();
        }

        res.status(201).json({ message: 'Supply added and inventory updated.', newSupply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all supplies
router.get('/', async (req, res) => {
    try {
        const supplies = await Supply.find().populate('supplierId').populate('seedType');
        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete supply
router.delete('/:id', async (req, res) => {
    try {
        const supply = await Supply.findByIdAndDelete(req.params.id);
        if (!supply) return res.status(404).json({ message: 'Supply not found.' });
        res.status(200).json({ message: 'Supply deleted.', supply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
