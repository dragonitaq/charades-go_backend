const express = require('express');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const categoryRouter = require('./routers/category.router');

const app = express();

// Implement CORS for our frontend domain only.
app.use(cors());

// CORS for development
if (process.env.NODE_ENV === 'development') {
  app.options('*', cors());
}

// CORS for production
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: 'https://charadesgo.netlify.app/',
    })
  );
}

// Text compression
app.use(compression());

// Sanitize for NoSQL query injection
app.use(mongoSanitize());

// Sanitize for XSS
app.use(xss());

app.use('/api/v1/category', categoryRouter);

module.exports = app;
