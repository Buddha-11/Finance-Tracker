// src/components/Incomes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      const token = document.cookie.split('=')[1];
      const response = await axios.get('/get-incomes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(response.data);
    };

    fetchIncomes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Incomes
      </Typography>
      <Paper style={{ padding: 16 }}>
        <List>
          {incomes.map((income) => (
            <ListItem key={income._id}>
              <ListItemText primary={`${income.description}: $${income.amount}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Incomes;
