const {Transaction, TransactionDetail} = require('../models')
const { validationResult } = require('express-validator');
const sequelize = require('../../config/database');

exports.getAllTransactions = async(req, res)=>{
    try{
        const transactions = await Transaction.findAll({
            include: [{model: TransactionDetail, as:'transaction_detail'}]
        })
        
        res.status(200).json(transactions);
    }catch(error){
        res.status(500).json({ message: 'Error retrieving transaction', error });
    }
};

exports.getTransactionById = async(req, res)=>{
    try{
        const transaction = await Transaction.findByPk(req.params.id, {
            include:[{model:TransactionDetail, as:'transaction_detail'}]
        })
        if(!transaction){
            return res.status(404).json({ message: 'transaction not found' });
        }
        res.status(200).json(transaction);
    }catch(error){
        res.status(500).json({ message: 'Error retrieving transaction', error });
    }
};

exports.createTransaction = async(req, res)=>{
    try {
        //const newTransaction = await Transaction.create(req.body); // Only transaction

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {paid_payment, transaction_detail, user_id} = req.body;
        let total_billing = 0;

        transaction_detail.forEach(detail => {
            total_billing += detail.amount
        });

        let outstanding_payment = req.body.paid_payment - total_billing
        outstanding_payment = Math.abs(outstanding_payment)

        const newTransaction = await Transaction.create({
            total_billing,
            paid_payment,
            outstanding_payment,
            user_id,
            transaction_detail
        },{
            include : [{model:TransactionDetail, as:'transaction_detail'}]
        });
        
        const result = {
            total_billing: newTransaction.total_billing,
            user_id:newTransaction.user_id,
            paid_payment: newTransaction.paid_payment,
            outstanding_payment: newTransaction.outstanding_payment,
            transaction_detail: newTransaction.transaction_detail.map(detail=>({
                transaction_id : newTransaction.id,
                description: detail.description,
                amount : detail.amount,
                status_payment: detail.status_payment,
                date: detail.date,
                due_date : detail.due_date,
                paid_date : detail.paid_date,
                payment_receipt : detail.payment_receipt
            }))
        };
        res.status(201).json(result); 
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });

    }
};

exports.updateTransaction = async(req, res)=>{

    try{
        const {paid_payment, transaction_detail, user_id} = req.body;
        let total_billing = 0;

        const transaction = await Transaction.findByPk(req.params.id);
        
        if(!transaction){
            return res.status(404).json({ message: 'Transaksi not found' });
        }

        transaction_detail.forEach(detail => {
            total_billing += detail.amount
        });

        transaction.total_billing = total_billing
        transaction.paid_payment = paid_payment
        transaction.user_id = user_id
        transaction.outstanding_payment = Math.abs(paid_payment - total_billing)

        await transaction.save()

        if(transaction_detail){
            await TransactionDetail.destroy({ where: { transaction_id: req.params.id } });
            const transaction_detail_list = transaction_detail.map(detail=>({
                transaction_id : transaction.id,
                description: detail.description,
                amount : detail.amount,
                status_payment: detail.status_payment,
                date: detail.date,
                due_date : detail.due_date,
                paid_date : detail.paid_date,
                payment_receipt : detail.payment_receipt
            }));
            await TransactionDetail.bulkCreate(transaction_detail_list);
        }
        
        res.json({ message: 'Transaction updated successfully', transaction });
    }catch(error){
        // await t.rollback();
        res.status(500).json({ message: 'Error updating transaction', error });
    }
};

exports.deleteTransaction = async(req, res)=>{
    try{
        const deleted = await Transaction.destroy({
            where: {id : req.params.id}
        });

        if(!deleted){
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await TransactionDetail.destroy({ where: { transaction_id: req.params.id } });
        
        res.status(204).json();

    }catch(error){
        res.status(500).json({ message: 'Error deleting Transaction', error });
    }   
};