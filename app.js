const express = require('express');
const cors = require('cors');

const categoryRouter = require('./routers/category.router');

const app = express();

app.use(cors());
app.options('*', cors());

app.use('/api/v1/category', categoryRouter);

module.exports = app;
