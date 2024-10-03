'use client';

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

const initialState = {
  description: '',
  date: '',
  amount: '',
};

export default function ExpenseForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Name of Expense</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Enter name of expense" style={{ marginBottom: '10px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Exepnse Amount</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Enter expense amount" style={{ marginBottom: '10px' }} name="amount" value={formInput.amount} onChange={handleChange} required />
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
    amount: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
