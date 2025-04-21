const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Import middleware
const userController = require('../controllers/user.controller');  

// Route đăng ký
router.post('/register', userController.register);

// Route đăng nhập
router.post('/login', userController.login);

// Route đăng xuất (có thể xóa JWT token hoặc invalid session)
router.post('/logout', authenticateToken, userController.logout);

// Route yêu cầu xác thực
router.get('/me', authenticateToken, userController.getMe);

// Tìm kiếm thông tin người dùng bằng ID
router.get('/:id', userController.getUserById);  // Route này sẽ tìm kiếm người dùng bằng ID

// Tìm kiếm thông tin người dùng bằng Username 
router.get('/username/:username', userController.getUserByUsername);

// Lấy email của người dùng
router.get('/:id/email', userController.getUserEmail);

// Lấy trạng thái mật khẩu của người dùng
router.get('/:id/password', userController.getUserPassword);

// Cập nhật thông tin người dùng
router.put('/:id', authenticateToken, userController.updateUser);

// Cập nhật mật khẩu người dùng
router.put('/:id/password', authenticateToken, userController.updatePassword);

// Cập nhật mật khẩu người dùng mà không cần kiểm tra mật khẩu hiện tại
router.put('/:id/password-no-verify', authenticateToken, userController.updatePasswordWithoutVerification);

// Cập nhật thông tin người dùng với ID từ body
router.put('/update', authenticateToken, userController.updateUserFromBody);

// Xóa người dùng
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
