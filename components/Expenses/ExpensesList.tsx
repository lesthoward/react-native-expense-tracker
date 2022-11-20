import { FlatList } from 'react-native';
import { Expense, ScreenList } from '../../types/app';
import ExpensesItem from './ExpensesItem';
import { getFormattedDate } from '../../utils/date';

export interface ExpensesListProps {
  expenses: Expense[];
  toScreen: ScreenList;
}

const ExpensesList = ({ expenses, toScreen }: ExpensesListProps) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item: { id, title, amount, date } }) => (
        <ExpensesItem
          id={id}
          title={title}
          amount={amount}
          date={getFormattedDate(date)}
          toScreen={toScreen}
        />
      )}
      keyExtractor={({ id }) => {
        return `${id}`;
      }}
    />
  );
};

export default ExpensesList;
