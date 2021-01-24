const express = require('express');

const { categoryController } = require('../controllers/category.controller');

const router = express.Router();

router.route('/:language').get(categoryController);

module.exports = router;
