const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const fileController = require('../controllers/fileController');

// GET: Login page
router.get('/', authController.getLoginPage);

// POST: Submit login
router.post('/login', authController.loginUser);
router.get('/dashboard', fileController.getDashboard);

// GET: Logout
router.get('/logout', authController.logoutUser);

module.exports = router;
