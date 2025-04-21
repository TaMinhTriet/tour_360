const adminService = require('../services/admin.service');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const config = require('../config/index');
const bcrypt = require('bcryptjs');

// Register new admin
const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return next(ApiError.badRequest('Username, email and password are required'));
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return next(ApiError.badRequest('Please use a valid email address'));
    }

    if (password.length < 6) {
      return next(ApiError.badRequest('Password must be at least 6 characters long'));
    }

    const admin = await adminService.register(username, email, password, role);
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: admin
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error during registration'));
  }
};

// Login admin
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await adminService.login(username, password);
    
    res.json({
      success: true,
      token,
      message: 'Đăng nhập thành công'
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error during login'));
  }
};

// Get admin profile
const getMe = async (req, res, next) => {
  try {
    const admin = await adminService.getMe(req.user.userId);
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error fetching admin profile'));
  }
};

// Update admin
const updateAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const updateData = req.body;

    const updatedAdmin = await adminService.updateAdmin(adminId, updateData);
    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: updatedAdmin
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error updating admin'));
  }
};

// Delete admin
const deleteAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const result = await adminService.deleteAdmin(adminId);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error deleting admin'));
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error fetching users'));
  }
};

// Create new user
const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role, isActive } = req.body;

    // Kiểm tra username đã tồn tại
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Tên đăng nhập đã tồn tại'
      });
    }

    // Kiểm tra email đã tồn tại
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email đã tồn tại'
      });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user',
      isActive: isActive !== undefined ? isActive : true
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Thêm người dùng thành công',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isActive: newUser.isActive
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể thêm người dùng'
    });
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, role, isActive } = req.body;

    // Kiểm tra người dùng tồn tại
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Kiểm tra username đã tồn tại (nếu thay đổi)
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Tên đăng nhập đã tồn tại'
        });
      }
    }

    // Kiểm tra email đã tồn tại (nếu thay đổi)
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email đã tồn tại'
        });
      }
    }

    // Cập nhật thông tin
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    res.json({
      success: true,
      message: 'Cập nhật người dùng thành công',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể cập nhật người dùng'
    });
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Kiểm tra người dùng tồn tại
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Xóa người dùng thành công'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể xóa người dùng'
    });
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await adminService.getUserById(userId);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error fetching user'));
  }
};

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể lấy danh sách người dùng'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateAdmin,
  deleteAdmin,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers
}; 