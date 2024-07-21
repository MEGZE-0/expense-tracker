// controllers/expenseController.js
const Expense = require('../models/expenseModel');
const { validationResult, check } = require('express-validator');

exports.getAllExpenses = async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = 'date' } = req.query;
      const expenses = await Expense.find()
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      res.json(expenses);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


exports.createExpense = [
    check('name').notEmpty().withMessage('Name is required'),
    check('amount').isNumeric().withMessage('Amount must be a number'),
    check('date').optional().isISO8601().withMessage('Date must be a valid ISO date'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        res.status(201).json(newExpense);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  ];

exports.deleteExpense = async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Expense not found');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// controllers/expenseController.js
exports.updateExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedExpense) return res.status(404).send('Expense not found');
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  