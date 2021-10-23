const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Otp = require('../models/otp');
const User = require('../models/user');
const CompanyDetail = require('../models/companyDetail');


const generateOtp = (num = 5) =>
  Math.random()
    .toFixed(num)
    .substr('-' + num);

exports.emailVefification = async (req, res, next) => {
  try {
    console.log(req.body.email);
    if (!req.body.email)
      throw createHttpError(400, 'Please enter your email address');

    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) throw createHttpError(400, 'Email already exists');

    const findUserOtp = await Otp.findOne({ user: req.body.email });

    if (findUserOtp)
      throw createHttpError(400, 'Otp is already send to the email');

    const newOtp = generateOtp();

    const msg = {
      to: req.body.email,
      from: 'vijikishorekumar143@gmail.com',
      subject: 'One Time Password',
      text: 'OTP Verification',
      html: `<h3>Your Verfiction Code<h3>
      <p>Enter this verifcation code in field</p>
      <h3><span>OTP: </span>${newOtp}</h3>
      <p>This website is created for a education purpose not for any commercial use</p>
      <h5>Thank You</h5>
      `,
    };

    const createUserOtp = await Otp.create({
      user: req.body.email,
      otp: newOtp,
      expiresIn: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    if (!createUserOtp) throw createHttpError(400, 'server error');

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        res.status(201).json({ result: createUserOtp });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    return next(createHttpError(err));
  }
};

// verify otp
exports.verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) throw createHttpError(400, 'Missing Credentials');

    const findOtp = await Otp.findOne({
      user: email,
      otp,
      expiresIn: { $gt: Date.now() },
    });

    if (!findOtp) throw createHttpError(400, 'Incorrect Otp, Please try again');

    await findOtp.deleteOne(); // DESTROYING AFTER RECEIVE CORRECT OTP MATCH

    // ADD USER TO DB
    const createUser = await User.create({ email, verified: true });

    // CREATE JWT TOKEN

    const jsonToken = jwt.sign({ _id: createUser._id }, process.env.JWT_Key);

    if (!jsonToken) throw createHttpError(400, 'server error');

    res.status(200).json({ result: createUser, token: jsonToken });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.companyDetails = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.userId);

    if (!findUser) throw createHttpError(404, 'User not found');

    const companyDetail = await CompanyDetail.create({
      user: req.userId,
      ...req.body,
    });

    if (!companyDetail) throw createHttpError(400, 'server error');

    res.status(200).json({ result: companyDetail });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.createPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const findUser = await User.findById(req.userId);

    if (!findUser) throw createHttpError(404, 'User not found');

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
        findUser.updateOne({ ...req.body, password: hash }, (err, user) => {
          if (err) throw createHttpError(400, 'server error');

          res.status(200).json({ result: user });
        });
      });
    });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email }).select('+password');

    if (!findUser) throw createHttpError(404, 'User not found');

    console.log(findUser);

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch) {
      throw createHttpError(400, 'Password does not match');
    } else {
      // creat json web token
      const jsonToken = jwt.sign({ _id: findUser._id }, process.env.JWT_Key);

      if (!jsonToken) throw createHttpError(400, 'server error');

      res.status(200).json({ result: findUser, token: jsonToken });
    }
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.logout = async (req, res, next) => {
  req.userId = null;
  res.status(200).json({ result: 'logged out successfully' });
};
