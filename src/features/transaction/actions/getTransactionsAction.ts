'use server';
import { transactions } from './dummy';

export const getTransactionsAction = async () => {
	return transactions;
};
