'use server';

import { Transaction, transactions } from './dummy';

export const newTransactionAction = async (transaction: Transaction) => {
	transactions.push(transaction);
};
