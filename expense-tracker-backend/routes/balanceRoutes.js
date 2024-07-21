const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const authenticateToken = require('../middlewares/authMiddleware');

router.use(authenticateToken); // Protect routes

router.get('/', balanceController.getAllBalances);
router.post('/', balanceController.createBalance);
router.put('/:id', balanceController.updateBalance);
router.delete('/:id', balanceController.deleteBalance);
router.get('/history', balanceController.getBalanceHistory);
router.get('/export', balanceController.exportBalanceData);

module.exports = router;
