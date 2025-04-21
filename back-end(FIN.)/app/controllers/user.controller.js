const User = require('../models/user.model');
const userService = require('../services/user.service');
const ApiError = require('../api-error');

// Lấy thông tin người dùng hiện tại (dựa trên token)
const getMe = async (req, res, next) => {
  try {
    // Lấy thông tin người dùng từ req.user (được thêm từ middleware authenticateToken)
    console.log('getMe - req.user:', req.user);
    const user = await User.findById(req.user.userId); // Bỏ select để lấy cả password
    
    if (!user) {
      return next(ApiError.notFound('User not found'));
    }

    console.log('getMe - user from database:', user);
    console.log('getMe - user email:', user.email);

    // Trả về thông tin người dùng
    const responseData = {
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
    
    console.log('getMe - response data:', responseData);
    
    res.status(200).json(responseData);
  } catch (error) {
    console.error('getMe - error:', error);
    return next(
      ApiError.internal('Error while fetching user information', error)
    );
  }
};

// Lấy thông tin người dùng qua ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Tìm người dùng bằng ID từ tham số trong URL
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin người dùng qua Username
const getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });  // Tìm người dùng bằng Username
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Lấy email người dùng
const getUserEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    next(error);
  }
};

// Lấy mật khẩu người dùng (chỉ trả về trạng thái, không trả về mật khẩu thực)
const getUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ hasPassword: Boolean(user.password) });
  } catch (error) {
    next(error);
  }
};

// Xóa người dùng
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res, next) => {
  try {
    console.log('Update user request params:', req.params);
    console.log('Update user request body:', req.body);
    
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const { username, email, password } = req.body;
    
    // Tìm người dùng trước khi cập nhật
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('Existing user before update:', {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      hasPassword: !!existingUser.password,
      passwordLength: existingUser.password ? existingUser.password.length : 0
    });
    
    // Chỉ cập nhật username và email, không cập nhật mật khẩu
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    
    // Nếu có password, bỏ qua để tránh thay đổi mật khẩu
    if (password) {
      console.log('Password field detected in update request, ignoring to prevent password change');
    }

    console.log('Updating user with ID:', userId);
    console.log('Update data:', updateData);

    // Sử dụng findByIdAndUpdate với tùy chọn select để chỉ cập nhật các trường cần thiết
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', {
      id: user._id,
      username: user.username,
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    next(ApiError.internal(error.message));
  }
};

// Cập nhật thông tin người dùng với ID từ body
const updateUserFromBody = async (req, res, next) => {
  try {
    console.log('Update user from body request body:', req.body);
    
    const { _id, username, email, password } = req.body;
    if (!_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Tìm người dùng trước khi cập nhật
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('Existing user before update:', {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      hasPassword: !!existingUser.password,
      passwordLength: existingUser.password ? existingUser.password.length : 0
    });
    
    // Chỉ cập nhật username và email, không cập nhật mật khẩu
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    
    // Nếu có password, bỏ qua để tránh thay đổi mật khẩu
    if (password) {
      console.log('Password field detected in update request, ignoring to prevent password change');
    }

    console.log('Updating user with ID:', _id);
    console.log('Update data:', updateData);

    // Sử dụng findByIdAndUpdate với tùy chọn select để chỉ cập nhật các trường cần thiết
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', {
      id: user._id,
      username: user.username,
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user from body:', error);
    next(ApiError.internal(error.message));
  }
};

// Đăng ký người dùng
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // // Kiểm tra xem người dùng đã tồn tại chưa
    // const existingUser = await userService.findUserByEmailOrUsername(username, email);
    // if (existingUser) {
    //   return next(ApiError.badRequest('Username or email already exists'));
    // Validate input
    if (!username || !email || !password) {
      return next(ApiError.badRequest('Username, email and password are required'));
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return next(ApiError.badRequest('Please use a valid email address'));
    }

    // Validate password length
    if (password.length < 6) {
      return next(ApiError.badRequest('Password must be at least 6 characters long'));
    }

    // Tiến hành tạo người dùng mới
    const user = await userService.register(username, email, password);
    // res.status(201).json({ message: 'User created successfully', user });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    // next(ApiError.internal(error.message));
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Error during registration'));
  }
};

// Đăng nhập người dùng
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(ApiError.unauthorized('Invalid credentials'));
  }
};

// Đăng xuất người dùng (invalidate JWT token hoặc xóa token)
const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Cập nhật mật khẩu người dùng
const updatePassword = async (req, res, next) => {
  try {
    console.log('Update password request params:', req.params);
    console.log('Update password request body:', req.body);
    
    // Lấy thông tin người dùng từ URL
    const userId = req.params.id;
    if (!userId) {
      console.error('User ID is missing');
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const { newPassword, confirmPassword } = req.body;
    
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (!newPassword || !confirmPassword) {
      console.error('Missing password fields:', { newPassword: !!newPassword, confirmPassword: !!confirmPassword });
      return res.status(400).json({ message: 'New password and confirm password are required' });
    }
    
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
    if (newPassword !== confirmPassword) {
      console.error('Password mismatch');
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }
    
    // Tìm người dùng
    console.log('Finding user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User found:', {
      id: user._id,
      username: user.username,
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    });
    
    // Mã hóa mật khẩu mới
    console.log('Hashing new password');
    const hashedPassword = await userService.hashPassword(newPassword);
    
    // Cập nhật mật khẩu
    console.log('Updating password in database');
    user.password = hashedPassword;
    await user.save();
    
    console.log('Password updated successfully');
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    next(ApiError.internal(error.message));
  }
};

// Cập nhật mật khẩu người dùng mà không cần kiểm tra mật khẩu hiện tại
const updatePasswordWithoutVerification = async (req, res, next) => {
  try {
    console.log('Update password without verification request params:', req.params);
    console.log('Update password without verification request body:', req.body);
    
    // Lấy thông tin người dùng từ URL
    const userId = req.params.id;
    if (!userId) {
      console.error('User ID is missing');
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const { newPassword, confirmPassword } = req.body;
    
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (!newPassword || !confirmPassword) {
      console.error('Missing password fields:', { newPassword: !!newPassword, confirmPassword: !!confirmPassword });
      return res.status(400).json({ message: 'New password and confirm password are required' });
    }
    
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
    if (newPassword !== confirmPassword) {
      console.error('Password mismatch');
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }
    
    // Tìm người dùng
    console.log('Finding user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User found:', {
      id: user._id,
      username: user.username,
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    });
    
    // Mã hóa mật khẩu mới
    console.log('Hashing new password');
    const hashedPassword = await userService.hashPassword(newPassword);
    
    // Cập nhật mật khẩu
    console.log('Updating password in database');
    user.password = hashedPassword;
    await user.save();
    
    console.log('Password updated successfully');
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    next(ApiError.internal(error.message));
  }
};

module.exports = {
  getMe,
  getUserById,
  getUserByUsername,
  getUserEmail,
  getUserPassword,
  deleteUser,
  updateUser,
  updateUserFromBody,
  register,
  login,
  logout,
  updatePassword,
  updatePasswordWithoutVerification,
};
