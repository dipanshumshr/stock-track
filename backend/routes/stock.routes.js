// backend/routes/stock.routes.js

const express = require('express');
const router = express.Router();

// Import the controller logic
const stockController = require('../controllers/stock.controller');

// When a POST request comes to the root of this router ('/'),
// execute the 'addStockItem' function from our controller.
router.post('/', stockController.addStockItem);

router.get('/', stockController.getAllStockItems);

module.exports = router;