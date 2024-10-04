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
import { Button } from 'react-bootstrap';
import { Create, DeleteForever } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleExpense, getExpenses } from '../api/expensesData';

export default function ExpenseCard() {
  const [expense, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const { user } = useAuth();

  const getAllExpenses = () => {
    getExpenses(user.uid).then((expenses) => {
      setExpenses(expenses);
      const totalAmount = expenses.reduce((accumulatedTotal, current) => accumulatedTotal + current.amount, 0);
      setTotal(totalAmount.toFixed(2));
    });
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <TableContainer component={Paper} style={{ width: '70%', margin: '0px auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bolder' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bolder' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bolder' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bolder' }} colSpan={2}>
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
              <TableCell>{e.category}</TableCell>
              <TableCell>${e.amount}</TableCell>
              <TableCell align="right">
                <div>
                  <Link href={`/expenses/${e.firebaseKey}`}>
                    <Button variant="link" style={{ color: 'goldenrod' }}>
                      <Create />
                    </Button>
                  </Link>
                  <Button
                    variant="link"
                    style={{ color: 'red' }}
                    onClick={async () => {
                      await deleteSingleExpense(e.firebaseKey);
                      getAllExpenses();
                    }}
                  >
                    <DeleteForever />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ fontWeight: 'bolder' }}>Total</TableCell>
            <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bolder' }}>
              ${total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
