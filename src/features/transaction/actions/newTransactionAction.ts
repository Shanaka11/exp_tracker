'use server';

import { createTransactionSchemaType, transactions } from './dummy';

export const newTransactionAction = async (
	transaction: createTransactionSchemaType
) => {
	const newTransaction = {
		...transaction,
		id: transactions.length + 1,
	};
	transactions.push(newTransaction);
};
