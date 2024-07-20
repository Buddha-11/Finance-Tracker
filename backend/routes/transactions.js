const express = require('express');
const  router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {addIncome, getIncomes, deleteIncome,getIncomeById ,updateIncome, getTotalIncome , getIncomeByDateRange , getMonthlyIncomeSummary} =require('../controllers/incomeController')
const {addExpense,getExpenses,deleteExpense,getExpenseById, getMonthlyExpenseSummary,getExpenseByDateRange,getTotalExpense,updateExpense } = require('../controllers/expenseController')
router.get('/',(req,res)=>{
    res.send('hi')
})

router.post('/add-income',requireAuth,addIncome)
    .get('/get-incomes',requireAuth,getIncomes)
    .get('/get-income/:id', requireAuth, getIncomeById)
    .delete('/delete-income/:id',requireAuth,deleteIncome)
    .put('/update-income/:id', requireAuth, updateIncome)
    .get('/total-income', requireAuth, getTotalIncome)
    .get('/incomes-by-date', requireAuth, getIncomeByDateRange)
    .get('/monthly-income-summary', requireAuth, getMonthlyIncomeSummary);

router.post('/add-expense',requireAuth,addExpense)
    .get('/get-expenses',requireAuth,getExpenses)
    .get('/get-expense/:id', requireAuth, getExpenseById)
    .delete('/delete-expense/:id',requireAuth,deleteExpense)
    .get('/monthly-expense-summary', requireAuth, getMonthlyExpenseSummary)
    .get('/expenses-by-date', requireAuth, getExpenseByDateRange)
    .get('/total-expense', requireAuth, getTotalExpense)
    .put('/update-expense/:id', requireAuth, updateExpense);

module.exports = router;