const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const adminController = require('../controllers/admin.controller');

// Public routes
router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Protected routes
router.get('/me', authenticateToken, adminController.getMe);
router.put('/:id', authenticateToken, adminController.updateAdmin);
router.delete('/:id', authenticateToken, adminController.deleteAdmin);

// User management routes (protected)
router.get('/users', authenticateToken, adminController.getAllUsers);
router.post('/users', authenticateToken, adminController.createUser);
router.get('/users/:id', authenticateToken, adminController.getUserById);
router.put('/users/:id', authenticateToken, adminController.updateUser);
router.delete('/users/:id', authenticateToken, adminController.deleteUser);

module.exports = router; 