const Income = require("../models/income");

module.exports.addIncome = async(req,res) =>{
    const {title , amount , category , description,date} = req.body;

    const income = new Income({
        userId: req.userId,
        title,
        category,
        date, // Use the userId from the authenticated user
        amount,
        description
      });
    
    //   try {
    //     await income.save();
    //     res.status(201).json(income);
    //   } catch (error) {
    //     res.status(400).json({ error: error.message });
    //   }
    // };


    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        
        income.save();
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}
exports.getIncomes =  async (req, res) =>{
    const userId = req.userId; // Get userId from the authenticated user

    try {
        const incomes = await Income.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
    // try {
    //     const incomes = await IncomeSchema.find().sort({createdAt: -1})
    //     res.status(200).json(incomes)
    // } catch (error) {
    //     res.status(500).json({message: 'Server Error'})
    // }
}

exports.deleteIncome = (req, res) =>{
    const id = req.params.id;
    console.log(req.params);
    Income.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
} 

exports.getIncomeById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, description } = req.body;

    try {
        const income = await Income.findByIdAndUpdate(id, { amount, description }, { new: true });

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getTotalIncome = async (req, res) => {
    const userId = req.userId;

    try {
        const totalIncome = await Income.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.status(200).json(totalIncome[0]?.total || 0);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomeByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.userId;

    try {
        const incomes = await Income.find({
            userId: userId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).sort({ createdAt: -1 });

        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getMonthlyIncomeSummary = async (req, res) => {
    const userId = req.userId;
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    try {
        const incomes = await Income.find({
            userId: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({ createdAt: -1 });

        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};