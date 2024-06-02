const Income = require("../models/income");

module.exports.addIncome = async(req,res) =>{
    const {title , amount , category , description,date} = req.body;
    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        const income = new Income(req.body);
        income.save();
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}
exports.getIncomes =  (req, res) =>{
    Income.find().sort({createdAt:-1})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json({message: 'Server Error'})
    })
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