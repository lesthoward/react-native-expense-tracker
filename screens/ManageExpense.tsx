import { Alert, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constans/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/NativeStackNavigator';
import { useContext, useLayoutEffect, useState } from 'react';
import PressableIcon from '../components/UI/PressableIcon';
import { ExpensesContext } from '../context/expenses/ExpensesContext';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { Expense } from '../types/app';
import { deleteExpense, postExpense } from '../utils/http-services';
import Loader from '../components/UI/Loader';
import ErrorOverlay from '../components/UI/ErrorOverlay';

interface ConfirmHandlerAdd {
  isEditing: false;
  expense: Omit<Expense, 'id'>;
}
interface ConfirmHandlerUpdate {
  isEditing: true;
  expense: Partial<Expense>;
}

export type ConfirmHandlerParams = ConfirmHandlerAdd | ConfirmHandlerUpdate;

const ManageExpense = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ManageExpense'>) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const {
    expenses,
    addExpenseHandler,
    deleteExpenseHandler,
    updateExpenseHandler,
  } = useContext(ExpensesContext);
  const [clearForm, setClearForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const expense = expenses.find((e) => {
    return e.id === expenseId;
  });

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: ConfirmHandlerParams) => {
    try {
      if (!expenseData.isEditing) {
        setIsLoading(true);
        const res = await postExpense(expenseData.expense);
        const data: Expense = {
          ...expenseData.expense,
          id: res.data.name,
        };
        addExpenseHandler(data);
      } else {
        if (!expenseId) return;
        updateExpenseHandler({
          ...expenseData.expense,
          id: expenseId,
        });
      }
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError("Couldn't save the expense");
    }
  };

  const deleteHandler = () => {
    if (!expenseId) return;
    return Alert.alert(
      'Are you sure?',
      'Do you really want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            if (!expenseId) return;
            try {
              setIsLoading(true);
              await deleteExpense(expenseId);
              deleteExpenseHandler(expenseId);
              navigation.goBack();
            } catch (error) {
              setIsLoading(false);
              setError("Couldn't delete expense");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const clearFormHandler = () => {
    setClearForm((prev) => !prev);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
      headerRight: ({ tintColor }) => (
        <PressableIcon
          iconName="cut"
          size={20}
          color={tintColor}
          onPress={clearFormHandler}
        />
      ),
    });
  }, [isEditing]);

  const errorHandler = () => {
    setError('');
    navigation.goBack();
  };

  if (!isLoading && error)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;

  if (isLoading) return <Loader />;

  return (
    <View style={styles.container}>
      <View>
        <ExpenseForm
          onClearForm={clearForm}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          isEditing={isEditing}
          defaultValues={expense}
        />
      </View>
      {isEditing && (
        <PressableIcon
          iconName="trash"
          size={20}
          color={GlobalStyles.colors.accentText}
          style={({ pressed }) => [
            styles.deleteContainer,
            pressed && styles.pressedDeleteContainer,
          ]}
          onPress={deleteHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.contentBackground,
    justifyContent: 'space-between',
  },
  deleteContainer: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.error,
  },
  pressedDeleteContainer: {
    opacity: 0.5,
  },
});

export default ManageExpense;
