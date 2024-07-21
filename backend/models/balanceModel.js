const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
