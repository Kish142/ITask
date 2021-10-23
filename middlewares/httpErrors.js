// handle duplicated fields error
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyvalue);
  const code = 409;
  const error = `An account with that ${field} already exists`;

  res.status(code).json({ error });
};

// handle field formatting, empty fields and mismatched passwords
const handleValidationError = (err, res) => {
  let errors = Object.values(err.message).map((el) => el.message);
  let code = 400;

  res.status(code).json({ error: errors });
};

// Error controller
module.exports = (err, req, res, next) => {
  console.log(err.message);
  console.log(err.name);

  try {
    switch (true) {
      case (err.name = 'ValidationError'):
        return (err = handleValidationError(err, res));
      case err.code && err.code == 11000:
        return (err = handleDuplicateKeyError(err, res));
      case err.name === 'CastError':
        return res.status(404).json({ error: 'URL not found' });
      default:
        return res
          .status(err.status || 500)
          .json({ error: err.message || 'An unknown error occured!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'An unknown error occured' });
  }
};
