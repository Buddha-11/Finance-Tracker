// src/components/Charts.js
import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Container, Typography, Grid, Paper } from '@mui/material';
import '../utils/chartConfig';

const Charts = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie.split('=')[1];
      const incomeResponse = await axios.get('/total-income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expenseResponse = await axios.get('/total-expense', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const incomesResponse = await axios.get('/get-incomes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expensesResponse = await axios.get('/get-expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalIncome(incomeResponse.data);
      setTotalExpense(expenseResponse.data);
      setIncomeData(incomesResponse.data);
      setExpenseData(expensesResponse.data);
    };

    fetchData();
  }, []);

  const incomeChartData = {
    labels: incomeData.map((income) => new Date(income.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Income',
        data: incomeData.map((income) => income.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const expenseChartData = {
    labels: expenseData.map((expense) => new Date(expense.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Expense',
        data: expenseData.map((expense) => expense.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Financial Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Total Income: ${totalIncome}
            </Typography>
            <Bar data={incomeChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Total Expense: ${totalExpense}
            </Typography>
            <Bar data={expenseChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Income Over Time
            </Typography>
            <Line data={incomeChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Expense Over Time
            </Typography>
            <Line data={expenseChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Income vs. Expense
            </Typography>
            <Doughnut
              data={{
                labels: ['Income', 'Expense'],
                datasets: [
                  {
                    data: [totalIncome, totalExpense],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;
