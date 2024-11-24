const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventory = await InventoryItem.find().populate('typeId');
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get inventory by type
router.get('/:itemType', async (req, res) => {
    try {
        const { itemType } = req.params;
        const items = await InventoryItem.find({ itemType }).populate('typeId');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
    try {
        const item = await InventoryItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Inventory item not found.' });
        res.status(200).json({ message: 'Inventory item deleted.', item });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
