'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleExpense } from '../../../api/expensesData';
import ExpenseForm from '../../../components/forms/ExpenseForm';

export default function EditExpense({ params }) {
  const [expense, setExpense] = useState({});

  const fbKey = params.firebaseKey;

  useEffect(() => {
    getSingleExpense(fbKey).then((data) => {
      setExpense(data);
      console.log(data); // Log the expense data for debugging
    });
  }, [fbKey]);

  return <ExpenseForm obj={expense} />;
}

EditExpense.propTypes = {
  params: PropTypes.string.isRequired,
};
