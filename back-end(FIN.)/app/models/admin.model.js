const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'superadmin']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Method kiểm tra password
adminSchema.methods.isPasswordMatch = async function(password) {
  console.log('Comparing passwords:');
  console.log('Input password:', password);
  console.log('Stored hashed password:', this.password);
  
  // Use the same salt for comparison
  const salt = '$2b$10$1GjU80xrqUJBDTGHunriXuuLUqs0kbtcbCi/ZpcV7Iy3O3cHxGhE6';
  const hashedInput = await bcrypt.hash(password, salt);
  const isMatch = hashedInput === this.password;
  
  console.log('Password match result:', isMatch);
  return isMatch;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; 