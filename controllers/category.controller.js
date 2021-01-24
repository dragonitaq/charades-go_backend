const Category = require('../models/category.model');

exports.categoryController = async (req, res) => {
  try {
    const categories = await Category.find({ language: `${req.params.language}` });
    res.status(200);
    res.json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    console.log(error);
  }
};
