// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(errorHandler);

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream.write }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Expense Tracker API');
});

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/balances', balanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
