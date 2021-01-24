const express = require('express');

const { categoryController } = require('../Controllers/category.controller');

const router = express.Router();

router.route('/:language').get(categoryController);

module.exports = router;
