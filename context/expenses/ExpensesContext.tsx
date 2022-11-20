import React, { createContext, useReducer } from 'react';
import { Expense } from '../../types/app';
import expensesReducer from './ExpensesReducer';

export interface IExpensesContext {
  expenses: Expense[];
  addExpenseHandler: (expense: Expense) => void;
  deleteExpenseHandler: (id: string | number) => void;
  updateExpenseHandler: (
    expense: Partial<Expense> & { id: string | number }
  ) => void;
  setExpenses: (expenses: Expense[]) => void;
}

const initialState: IExpensesContext = {
  expenses: [],
  addExpenseHandler: () => {},
  deleteExpenseHandler: () => {},
  updateExpenseHandler: () => {},
  setExpenses: () => {},
};

export const ExpensesContext = createContext<IExpensesContext>(initialState);

const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);

  const addExpenseHandler = (expense: Expense) => {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
  };

  const deleteExpenseHandler = (id: string | number) => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: id,
    });
  };

  const updateExpenseHandler = (
    expense: Partial<Expense> & { id: string | number }
  ) => {
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: expense,
    });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatch({
      type: 'SET_EXPENSES',
      payload: expenses,
    });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState.expenses,
        addExpenseHandler,
        deleteExpenseHandler,
        updateExpenseHandler,
        setExpenses
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
