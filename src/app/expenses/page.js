/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import ExpenseCard from '../../components/ExpenseCard';

export default function Expense() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px 0px' }}>
        <Link href="/expenses/new" passHref>
          <Button>Add Expense</Button>
        </Link>
      </div>
      <ExpenseCard />
    </>
  );
}
