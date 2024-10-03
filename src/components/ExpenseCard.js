/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '../utils/context/authContext';
import { getExpenses } from '../api/expensesData';

export default function ExpenseCard() {
  const [expense, setExpenses] = useState([]);

  const { user } = useAuth();

  const getAllExpenses = () => {
    getExpenses(user.uid).then(setExpenses);
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bolder' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bolder' }}>Description</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bolder' }}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expense.map((e) => (
            <TableRow key={e.firebaseKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{e.date}</TableCell>
              <TableCell component="th" scope="row">
                {e.description}
              </TableCell>
              <TableCell align="right">{e.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
