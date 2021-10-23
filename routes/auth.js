const express = require('express');
const {
  emailVefification,
  verifyOtp,
  companyDetails,
  createPassword,
  login,
  logout,
} = require('../controllers/auth');

// Middlewares
const { authorize } = require('../middlewares/authorize');

const router = express.Router();

router.route('/register/email').post(emailVefification);

router.route('/register/verify-otp').post(verifyOtp);

router.route('/register/company-details').post(authorize, companyDetails);

router.route('/register/create-password').post(authorize, createPassword);

router.route('/login').post(login);

router.route('/logout').post(logout);

// router.route('/user').get(getUser);

module.exports = router;
