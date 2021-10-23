const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const httpErrors = require('./middlewares/httpErrors');

// route files
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config env file
dotenv.config();

// initialize db connection
connectDB();

// setup cors
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/api', auth);
app.use('/api/dashboard', dashboard);

app.use(httpErrors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening on port - ${PORT}`));
