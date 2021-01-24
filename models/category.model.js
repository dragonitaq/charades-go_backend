const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  language: {
    type: String,
    lowercase: true,
    required: [true, 'A category must have its language specified.'],
  },
  title: {
    type: String,
    required: [true, 'A category must have a name.'],
    // REVIEW Review max length of category name
    maxlength: [30, 'A category name can only have maximum of 30 characters.'],
  },
  description: {
    type: String,
    required: [true, 'A category must have description.'],
    maxlength: [300, 'Category description can only have maximum of 300 characters.'],
  },
  authorName: {
    type: String,
    required: [true, 'A category must have a author name.'],
  },
  tags: [
    {
      type: String,
    },
  ],
  vocabulary: [
    {
      type: String,
      // REVIEW See if we need to have minimum number of array length.
      required: [true, 'Category must contain as many words/phrases as it should.'],
    },
  ],
  likeAmount: Number,
  savedAmount: Number,
  reportedAmount: Number,
  blacklisted: Boolean,
  nsfw: Boolean,
  hidden: Boolean,
});

categorySchema.set('timestamps', true);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
