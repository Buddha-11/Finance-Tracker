// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Incomes from './components/Incomes';
import Expenses from './components/Expenses';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import Summary from './components/Summary';
import Charts from './components/Charts';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/add-income" element={<IncomeForm />} />
          <Route path="/add-expense" element={<ExpenseForm />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
