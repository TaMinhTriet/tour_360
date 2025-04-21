const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiError = require('./app/api-error');
const userRoutes = require('./app/routes/user.routes');
const adminRoutes = require('./app/routes/admin.routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://tour-360-mocha.vercel.app'], // chỉ cho phép từ frontend Vercel
  credentials: true
}));

app.use(bodyParser.json());

// Định nghĩa các route
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


// Xử lý lỗi
app.use((err, req, res, next) => {
  if (err) {
    const { status, message } = err;
    return res.status(status || 500).json({ message: message || 'Internal Server Error' });
  }
  next();
});

module.exports = app;
