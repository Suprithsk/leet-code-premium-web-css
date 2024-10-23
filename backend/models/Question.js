const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Questions schema
const questionSchema = new Schema({
  ID: Number,
  Title: String,
  Acceptance: String,
  Difficulty: String,
  Frequency: Number,
  'Leetcode Question Link': String,
  asked_by: [String],
});

// Create the Questions model
const Question = mongoose.model('Questions', questionSchema); 

module.exports = Question;
