const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// GET: Login page
router.get('/', authController.getLoginPage);

// POST: Submit login
router.post('/login', authController.loginUser);

// GET: Logout
router.get('/logout', authController.logoutUser);

module.exports = router;
