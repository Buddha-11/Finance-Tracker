// src/components/Expenses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = document.cookie.split('=')[1];
      const response = await axios.get('/get-expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    };

    fetchExpenses();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>
      <Paper style={{ padding: 16 }}>
        <List>
          {expenses.map((expense) => (
            <ListItem key={expense._id}>
              <ListItemText primary={`${expense.description}: $${expense.amount}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Expenses;
