import { ExpensesAction } from '../../types/app';
import { IExpensesContext } from './ExpensesContext';

const expensesReducer = (state: IExpensesContext, action: ExpensesAction) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.payload.id) {
            return {
              ...expense,
              ...action.payload,
            };
          }
          return expense;
        }),
      };
    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload.reverse(),
      };

    default:
      return state;
      break;
  }
};

export default expensesReducer;
