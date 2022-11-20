import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/Expenses/ExprensesOutput';
import { ExpensesContext } from '../context/expenses/ExpensesContext';
import { Expense } from '../types/app';

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  
  useEffect(() => {
    const moreExpensiveExpenses = expenses.sort((a, b) => b.amount - a.amount);
    moreExpensiveExpenses.length > 7 && (moreExpensiveExpenses.length = 7);
    setFilteredExpenses(moreExpensiveExpenses);
  }, [expenses]);

  return (
    <ExpensesOutput
      expenses={filteredExpenses}
      periodName={`Last 7 higher expenses`}
      toScreen="ManageExpense"
      noExpensesText={`No expenses registered`}
    />
  );
};

export default RecentExpenses;
