const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  //Send Responce
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    success: 'Error',
    message: 'This is not implimented Yet!!!',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    success: 'Error',
    message: 'This is not implimented Yet!!!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    success: 'Error',
    message: 'This is not implimented Yet!!!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    success: 'Error',
    message: 'This is not implimented Yet!!!',
  });
};
