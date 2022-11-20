import { BottomTabsParamList } from '../navigator/BottomTabsNavigator';
import { RootStackParamList } from '../navigator/NativeStackNavigator';

export interface Expense {
  id: string | number;
  title: string;
  description?: string;
  amount: number;
  date: Date;
}

export type ScreenList = keyof RootStackParamList | keyof BottomTabsParamList;
export type ScreenParams = RootStackParamList & BottomTabsParamList;


export type ADD_EXPENSE = {
  type: 'ADD_EXPENSE';
  payload: Expense;
};

export type DELETE_EXPENSE = {
  type: 'DELETE_EXPENSE';
  payload: string | number;
}

export type UPDATE_EXPENSE = {
  type: 'UPDATE_EXPENSE';
  payload: Partial<Expense> & { id: string | number };
}

export type SET_EXPENSES = {
  type: 'SET_EXPENSES';
  payload: Expense[];
}

export type ExpensesAction = ADD_EXPENSE | DELETE_EXPENSE | UPDATE_EXPENSE | SET_EXPENSES;