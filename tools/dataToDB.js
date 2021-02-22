const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const categories = require('../data/categories.initialData');
const convertTxtToArraySync = require('./convertTxtToArraySync');

// Connect Mongo database
dotenv.config({ path: './config.env' });

const db = process.env.MONGODB.replace('<USERNAME>', process.env.MONGODB_USERNAME).replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database is connected!');
  });

// Import initial bulk data
const importData = () => {
  categories.forEach(async (category, ii) => {
    try {
      await Category.create(category);
      console.log(`Category data ${ii} imported`);
    } catch (error) {
      console.log(error);
    }
  });
};

// Wipe the whole database collection
const wipeData = async () => {
  try {
    await Category.deleteMany();
    console.log('All data deleted');
  } catch (error) {
    console.log(error);
  }
};

// Update category's vocabulary
const categoryId = '600bab00a91a8c142846ac26';
const filePath = '../data/update.txt';
const encoder = 'utf-8';

const updateVocabulary = async () => {
  try {
    const newArray = convertTxtToArraySync(filePath, encoder);
    const newDoc = await Category.findByIdAndUpdate(categoryId, { $addToSet: { vocabulary: { $each: newArray } } }, { new: true });
    console.log(newDoc);
  } catch (error) {
    console.log(error);
  }
};

// Configure action types
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--wipe') {
  wipeData();
} else if (process.argv[2] === '--update') {
  updateVocabulary();
}

/*
Use the following text input to the command line to execute targeted function.
First cd into backend folder. Then choose & run command below:
node ./tools/dataToDB.js --wipe
node ./tools/dataToDB.js --import
node ./tools/dataToDB.js --update
*/
