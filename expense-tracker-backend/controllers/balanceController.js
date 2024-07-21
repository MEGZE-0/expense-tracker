const Balance = require('../models/balanceModel');

exports.getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.find().populate('user');
    res.json(balances);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createBalance = async (req, res) => {
  try {
    const newBalance = new Balance({ ...req.body, user: req.user.id });
    await newBalance.save();
    res.status(201).json(newBalance);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBalance = await Balance.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBalance) return res.status(404).send('Balance not found');
    res.json(updatedBalance);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteBalance = async (req, res) => {
  try {
    const result = await Balance.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Balance not found');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getBalanceHistory = async (req, res) => {
    try {
      const history = await Balance.find({ user: req.user.id }).sort({ date: -1 });
      res.json(history);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  exports.exportBalanceData = async (req, res) => {
    try {
      const balances = await Balance.find({ user: req.user.id });
      const csv = parse(balances);
      res.header('Content-Type', 'text/csv');
      res.attachment('balances.csv');
      res.send(csv);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };