require('dotenv').config();

const jwt = require('jsonwebtoken');
const ApiError = require('../api-error');

// Middleware để xác thực token JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header Authorization

  if (!token) {
    return next(ApiError.unauthorized('Access denied, token missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Kiểm tra token hợp lệ
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next();
  } catch (error) {
    console.error('JWT Verification Error: ', error);
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
};

module.exports = authenticateToken;
