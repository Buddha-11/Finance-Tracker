const express = require('express');
const  router = express.Router();
const {addIncome, getIncomes, deleteIncome} =require('../controllers/incomeController')
const {addExpense,getExpenses,deleteExpense} = require('../controllers/expenseController')
router.get('/',(req,res)=>{
    res.send('hi')
})

router.post('/add-income',addIncome)
    .get('/get-incomes',getIncomes)
    .delete('/delete-income/:id',deleteIncome)

router.post('/add-expense',addExpense)
    .get('/get-expenses',getExpenses)
    .delete('/delete-expense/:id',deleteExpense)
module.exports = router;