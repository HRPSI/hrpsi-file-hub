const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
// GET: Dashboard
router.get('/', fileController.getDashboard);


module.exports = router;
