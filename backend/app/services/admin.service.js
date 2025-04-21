const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const ApiError = require('../api-error');

// Find admin by email or username
const findAdminByEmailOrUsername = async (username, email) => {
  try {
    const existingAdmin = await Admin.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    });
    return existingAdmin;
  } catch (error) {
    throw new ApiError(500, 'Error checking existing admin');
  }
};

// Find admin by ID
const findAdminById = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) throw ApiError.notFound('Admin not found');
  return admin;
};

// Register new admin
const register = async (username, email, password, role = 'admin') => {
  try {
    const existingAdmin = await findAdminByEmailOrUsername(username, email);
    if (existingAdmin) {
      if (existingAdmin.username.toLowerCase() === username.toLowerCase()) {
        throw new ApiError(400, 'Username already exists');
      }
      if (existingAdmin.email.toLowerCase() === email.toLowerCase()) {
        throw new ApiError(400, 'Email already exists');
      }
    }
    
    // Hash password with a consistent salt
    const salt = '$2b$10$1GjU80xrqUJBDTGHunriXuuLUqs0kbtcbCi/ZpcV7Iy3O3cHxGhE6';
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newAdmin = new Admin({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    await newAdmin.save();
    
    return {
      id: newAdmin._id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      createdAt: newAdmin.createdAt
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error creating new admin');
  }
};

// Login admin
const login = async (username, password) => {
  try {
    console.log('Login attempt for username:', username);
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    
    if (!admin) {
      console.log('Admin not found for username:', username);
      throw new ApiError(401, 'Invalid credentials');
    }

    console.log('Admin found:', {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      isActive: admin.isActive
    });

    console.log('Checking password...');
    const isPasswordValid = await admin.isPasswordMatch(password);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Password validation failed');
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!admin.isActive) {
      console.log('Admin account is not active');
      throw new ApiError(403, 'Account is deactivated');
    }

    const token = jwt.sign(
      { 
        userId: admin._id,
        role: admin.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    console.log('Login successful, token generated');
    return token;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error during login');
  }
};

// Get admin profile
const getMe = async (adminId) => {
  const admin = await Admin.findById(adminId).select('-password');
  if (!admin) throw ApiError.notFound('Admin not found');
  return {
    id: admin._id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt
  };
};

// Update admin
const updateAdmin = async (adminId, updateData) => {
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    // Let the model's pre-save hook handle password hashing
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    return updatedAdmin;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error updating admin');
  }
};

// Delete admin
const deleteAdmin = async (adminId) => {
  try {
    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }
    return { message: 'Admin deleted successfully' };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error deleting admin');
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    return users;
  } catch (error) {
    throw new ApiError(500, 'Error fetching users');
  }
};

// Create new user
const createUser = async (username, email, password, role, isActive) => {
  try {
    // Check if username exists
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    if (existingUser) {
      throw new ApiError(400, 'Username already exists');
    }

    // Check if email exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      throw new ApiError(400, 'Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user',
      isActive: isActive !== undefined ? isActive : true
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw new ApiError(500, 'Error creating user');
  }
};

// Update user by admin
const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // If updating email or username, check for duplicates
    if (updateData.email || updateData.username) {
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: userId } },
          {
            $or: [
              { username: updateData.username?.toLowerCase() },
              { email: updateData.email?.toLowerCase() }
            ]
          }
        ]
      });

      if (existingUser) {
        if (existingUser.username.toLowerCase() === updateData.username?.toLowerCase()) {
          throw new ApiError(400, 'Username already exists');
        }
        if (existingUser.email.toLowerCase() === updateData.email?.toLowerCase()) {
          throw new ApiError(400, 'Email already exists');
        }
      }
    }

    // Hash password if it's being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Convert email and username to lowercase if they exist
    if (updateData.email) updateData.email = updateData.email.toLowerCase();
    if (updateData.username) updateData.username = updateData.username.toLowerCase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    return updatedUser;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error updating user');
  }
};

// Delete user by admin
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return { message: 'User deleted successfully' };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error deleting user');
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error fetching user');
  }
};

module.exports = {
  findAdminByEmailOrUsername,
  findAdminById,
  register,
  login,
  getMe,
  updateAdmin,
  deleteAdmin,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
}; 