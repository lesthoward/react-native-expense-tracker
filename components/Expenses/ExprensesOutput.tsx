import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import { Expense, ScreenList } from '../../types/app';
import ExpensesList from './ExpensesList';
import ExpensesSummary, { ExpensesSummaryProps } from './ExpensesSummary';

interface ExpensesOutputProps extends ExpensesSummaryProps {
  expenses: Expense[];
  toScreen: ScreenList;
  noExpensesText?: string;
}

const ExpensesOutput = ({
  expenses,
  periodName,
  toScreen,
  noExpensesText,
}: ExpensesOutputProps) => {
  return (
    <>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <View style={styles.container}>
        {expenses.length ? (
          <ExpensesList expenses={expenses} toScreen={toScreen} />
        ) : (
          <Text style={styles.message}>{noExpensesText}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: GlobalStyles.colors.contentBackground,
  },
  message: {
    textAlign: 'center',
    color: GlobalStyles.colors.noHighlight,
    marginTop: 12,
  },
});

export default ExpensesOutput;
