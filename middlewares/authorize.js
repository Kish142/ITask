const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

exports.authorize = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(createHttpError(401, 'Access denied'));

  // verify jwt token
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return next(createHttpError(400, 'server error'));
  }
};
