const Expense = require("../models/expense");

module.exports.addExpense = async(req,res) =>{
    const {title , amount , category , description,date} = req.body;
    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        const expense = new Expense(req.body);
        expense.save();
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}
exports.getExpenses =  (req, res) =>{
    Expense.find().sort({createdAt:-1})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json({message: 'Server Error'})
    })
    // try {
    //     const Expenses = await ExpenseSchema.find().sort({createdAt: -1})
    //     res.status(200).json(Expenses)
    // } catch (error) {
    //     res.status(500).json({message: 'Server Error'})
    // }
}

exports.deleteExpense = (req, res) =>{
    const id = req.params.id;
    console.log(req.params);
    Expense.findByIdAndDelete(id)
        .then((Expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
} 