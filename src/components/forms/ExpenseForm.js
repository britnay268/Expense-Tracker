'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import { createExpense, updateExpense } from '../../api/expensesData';

const initialState = {
  description: '',
  date: '',
  amount: '',
};

export default function ExpenseForm({ obj = initialState }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, uid: user.uid };
    if (obj.firebaseKey) {
      updateExpense(payload).then(() => router.push('/expenses'));
    } else {
      createExpense(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateExpense(patchPayload).then(() => {
          router.push('/expenses');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '70%', margin: '20px auto' }}>
      <Form.Group>
        <Form.Label>Name of Expense</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Enter name of expense" style={{ marginBottom: '10px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Expense Amount</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Enter expense amount" style={{ marginBottom: '10px' }} name="amount" value={formInput.amount} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category of Expense</Form.Label>
        <Form.Select size="lg" aria-label="Role" name="category" onChange={handleChange} className="mb-3" value={formInput.category} required>
          <option value="">Fixed or Variable Expense?</option>
          <option value="Fixed Expense">Fixed Expense</option>
          <option value="Variable Expense">Variable Expense</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3 align">
        <Form.Label>Date of Expense</Form.Label>
        <Form.Control size="lg" type="date" id="date" name="date" value={formInput.date} min="1910-10-31" max="2025-1-30" onChange={handleChange} />
      </Form.Group>

      <div className="text-center my-4">
        <Button type="submit" style={{ marginRight: '20px' }}>
          {obj.firebaseKey ? 'Update' : 'Create'} Expense
        </Button>
        <Link href="/expenses" passHref>
          <Button style={{ backgroundColor: 'darkviolet', border: 'darkviolet' }}>Back To Expenses</Button>
        </Link>
      </div>
    </Form>
  );
}

ExpenseForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};
