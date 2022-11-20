import { Expense } from '../types/app';
import { getExpenses } from './http-services';

export const generateRandom = (): string => {
  return Math.random().toString(26).slice(2) + Date.now().toString(13);
};

export const dataHandler = (expenses: Omit<Expense, "id">[]) => {
  if(!expenses) return [];
  const formattedExpenses: Expense[] = Object.entries(expenses).map((key, value) => {
    return {
      ...key[1],  
      id: key[0],
      date: new Date(key[1].date),
    };
  });
  return formattedExpenses;
}