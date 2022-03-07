const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/', authController.loggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.loggedIn, viewsController.getTour);
router.get('/login', authController.loggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
