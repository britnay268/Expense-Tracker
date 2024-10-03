import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get All Expenses by uid
const getExpenses = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/expenses.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.warn(Object.values(data));
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createExpense = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/expenses.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleExpense = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/expenses/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        // console.warn(data);
      })
      .catch(reject);
  });

const deleteSingleExpense = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/expenses/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateExpense = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/expensess/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getExpenseByCategory = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/expenses.json?orderBy="category_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getExpenses, getSingleExpense, createExpense, deleteSingleExpense, updateExpense, getExpenseByCategory };
