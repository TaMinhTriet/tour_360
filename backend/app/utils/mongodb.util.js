const mongoose = require('mongoose');

// Một số công cụ tiện ích cho MongoDB, ví dụ như kết nối, xử lý...
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
