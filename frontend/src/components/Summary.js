// src/components/Summary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper } from '@mui/material';

const Summary = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = document.cookie.split('=')[1];
      const incomeResponse = await axios.get('/total-income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expenseResponse = await axios.get('/total-expense', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalIncome(incomeResponse.data);
      setTotalExpense(expenseResponse.data);
    };

    fetchSummary();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Summary
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6">
          Total Income: ${totalIncome}
        </Typography>
        <Typography variant="h6">
          Total Expense: ${totalExpense}
        </Typography>
        <Typography variant="h6">
          Net Balance: ${totalIncome - totalExpense}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Summary;
