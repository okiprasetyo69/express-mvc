const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { body } = require('express-validator');

// TRANSACTION ROUTES
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/', [
    body('paid_payment').isInt().withMessage('Paid payment shlould be integer !'),
    body('user_id').isInt().withMessage('User Id shlould be integer !'),
    body('transaction_detail').isArray().withMessage('Transaction detail must be array of object !'),
    // body('*.description').isString().withMessage('Description shuold be a string'),
    // body('*.amount').isFloat({ gt: 0 }).withMessage('Amount should be number more than 0 !'),
    // body('*.status_payment').isInt().withMessage('Status payment should be integer !'),
    // body('*.date').isISO8601().withMessage('Date should be format date Y-m-d !'),
    // body('*.due_date').isISO8601().withMessage('Date should be format date Y-m-d !'),
    // body('*.paid_date').isISO8601().withMessage('Date should be format date Y-m-d !'),
    // body('*.payment_receipt').isString().optional().withMessage('Payment receipt should be a string'),
],transactionController.createTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;