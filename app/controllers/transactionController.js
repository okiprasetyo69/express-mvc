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
        const {items} = req.body;
        const newTransaction = await Transaction.create(req.body);  
        const newTransactionDetail = await items.map(item =>({
            ...item,
            transaction_id : transaction.id,
            description : req.params.description,
            amount : req.params.amount,
            status_payment : req.params.status_payment,
            date : req.params.date,
            due_date : req.params.due_date,
            paid_date : req.params.paid_date,
            payment_receipt : req.params.payment_receipt,
        }));

        await TransactionDetail.bulkCreate(newTransactionDetail);
        res.status(201).json({ newTransaction, items: newTransactionDetail });
        //res.status(201).json(newTransaction); 
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