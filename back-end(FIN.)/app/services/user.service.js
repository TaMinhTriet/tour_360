const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../api-error');

// Tìm người dùng theo email hoặc username
const findUserByEmailOrUsername = async (username, email) => {
  // return await User.findOne({ $or: [{ username }, { email }] });
  try {
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    });
    return existingUser;
  } catch (error) {
    throw new ApiError(500, 'Error checking existing user');
  }
};

// Tìm người dùng theo ID
const findUserById = async (id) => {
  return await User.findById(id);
};

// Tìm người dùng theo username
const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

// Đăng ký người dùng mới
const register = async (username, email, password) => {
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = new User({
  //   username,
  //   email,
  //   password: hashedPassword,
  // });
  // await newUser.save();
  // return newUser;
  try {
    // Kiểm tra lại một lần nữa trước khi tạo
    const existingUser = await findUserByEmailOrUsername(username, email);
    if (existingUser) {
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        throw new ApiError(400, 'Username already exists');
      }
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        throw new ApiError(400, 'Email already exists');
      }
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo người dùng mới với email và username đã được chuyển thành chữ thường
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Lưu người dùng vào database
    await newUser.save();
    
    // Trả về thông tin người dùng (không bao gồm mật khẩu)
    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error creating new user');
  }
};

// Hash mật khẩu
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  console.log('Comparing passwords:');
  console.log('Plain password:', plainPassword);
  console.log('Hashed password:', hashedPassword);
  
  try {
    // Sử dụng bcrypt.compare trực tiếp
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password comparison result:', result);
    return result;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );
};

// Xóa người dùng
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Đăng nhập
const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw ApiError.unauthorized('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw ApiError.unauthorized('Invalid username or password');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

// Lấy thông tin người dùng hiện tại
const getMe = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw ApiError.notFound('User not found');
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};



// Lấy email người dùng
const getUserEmail = async (id) => {
  const user = await User.findById(id);
  if (!user) throw ApiError.notFound('User not found');
  return { email: user.email };
};

// Đăng xuất (có thể thêm logic vô hiệu hóa token nếu cần)
const logout = async () => {
  // Implement token blacklist or session invalidation if needed
  return true;
};

module.exports = {
  findUserByEmailOrUsername,
  findUserById,
  findUserByUsername,
  register,
  hashPassword,
  comparePassword,
  updateUser,
  deleteUser,
  login,
  getMe,
  getUserEmail,
  logout
};
