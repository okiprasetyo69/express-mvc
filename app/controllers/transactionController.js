const {Transaction, TransactionDetail} = require('../models')

exports.getAllTransactions = async(req, res)=>{
    try{
        const transactions = await Transaction.findAll()
        
        res.status(200).json(transactions);
    }catch(error){
        res.status(500).json({ message: 'Error retrieving transaction', error });
    }
};

exports.getTransactionById = async(req, res)=>{
    try{
        const transaction = await Transaction.findByPk(req.params.id)
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
        const {paid_payment, transaction_detail, user_id} = req.body;
        let total_billing = 0;

        transaction_detail.forEach(detail => {
            total_billing += detail.amount
        });

        let outstanding_payment = req.body.paid_payment - total_billing
        
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
                payment_recepit : detail.payment_recepit
            }))
        };
         res.status(201).json(result); 
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });

    }
};

exports.updateTransaction = async(req, res)=>{
    try{
        const [updated] = await Transaction.update(req.body,{
            where : {id: req.params.id}
        });

        if(!updated){
            return res.status(404).json({ message: 'Transacntion not found' });
        }

        const updateTransaction = await Transaction.findByPk(req.params.id) 
        res.status(200).json(updateTransaction);
    }catch(error){
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
        res.status(204).json();

    }catch(error){
        res.status(500).json({ message: 'Error deleting Transaction', error });
    }   
};