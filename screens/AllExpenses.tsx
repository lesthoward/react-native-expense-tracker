import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/Expenses/ExprensesOutput';
import Loader from '../components/UI/Loader';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { ExpensesContext } from '../context/expenses/ExpensesContext';
import { dataHandler } from '../utils';
import { getExpenses } from '../utils/http-services';

const AllExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const contentHandler = async () => {
      try {
        const res = await getExpenses();
        const formattedExpenses = dataHandler(res.data);
        setExpenses(formattedExpenses);
      } catch (error: any) {
        setError("Couldn't load expenses");
      }
      setIsLoading(false);
    };
    contentHandler();
  }, []);

  const errorHandler = () => {
    setError('');
  };

  if (!isLoading && error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) return <Loader />;

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      toScreen="ManageExpense"
      noExpensesText="No expenses, please add some!"
    />
  );
};

export default AllExpenses;
