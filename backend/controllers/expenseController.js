const Expense = require("../models/expense");

module.exports.addExpense = async(req,res) =>{
    const {title , amount , category , description,date} = req.body;
    
    const expense = new Expense({
        userId: req.userId,
        title,
        category,
        date, // Use the userId from the authenticated user
        amount,
        description
      });
    
    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        
        expense.save();
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}
exports.getExpenses =  async (req, res) =>{
    const userId = req.userId; // Get userId from the authenticated user

    try {
        const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
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

exports.getExpenseById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(expense);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description } = req.body;

    try {
        const expense = await Expense.findByIdAndUpdate(id, { amount, description }, { new: true });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(expense);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getTotalExpense = async (req, res) => {
    const userId = req.userId;

    try {
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.status(200).json(totalExpense[0]?.total || 0);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getExpenseByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.userId;

    try {
        const expenses = await Expense.find({
            userId: userId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).sort({ createdAt: -1 });

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getMonthlyExpenseSummary = async (req, res) => {
    const userId = req.userId;
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    try {
        const expenses = await Expense.find({
            userId: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({ createdAt: -1 });

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};