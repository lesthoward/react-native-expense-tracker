import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import { Expense } from '../../types/app';

export interface ExpensesSummaryProps {
  periodName: string;
  expenses: Expense[];
}

const ExpensesSummary = ({ periodName, expenses }: ExpensesSummaryProps) => {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{periodName}</Text>
      <Text style={styles.sum}>${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.topExpenseBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  text: {
    color: GlobalStyles.colors.topExpenseText,
    ...GlobalStyles.typography.expense
  },
  sum : {
    color: GlobalStyles.colors.topExpenseText,
    ...GlobalStyles.typography.numbers
  }
});

export default ExpensesSummary;
