// models/expenseModel.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now }, // default date to now
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
