import { Expense } from '../types/app';
import axios, { AxiosPromise } from 'axios';
import Constants from 'expo-constants';

const apiURL = (Constants.expoConfig as any).apiURL;

export const postExpense = (
  expense: Omit<Expense, 'id'>
): AxiosPromise<{ name: string }> => {
  const url = apiURL + '/expenses.json';
  return axios.post(url, expense);
};

export const getExpenses = (): AxiosPromise<Expense[]> => {
  const url = apiURL + '/expenses.json';
  return axios.get(url);
};

export const deleteExpense = (id: string | number): AxiosPromise => {
  const url = apiURL + '/expenses/' + id + '.json';
  return axios.delete(url);
};

export const updateExpense = (
  id: string,
  expense: Omit<Expense, 'id'>
): AxiosPromise => {
  const url = apiURL + '/expenses/' + id + '.json';
  return axios.put(url, expense);
};
