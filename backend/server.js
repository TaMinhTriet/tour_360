const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const { config } = require('./app/config');
require('dotenv').config();

// Kết nối đến MongoDB
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });

// Khởi chạy server
// const port = config.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});