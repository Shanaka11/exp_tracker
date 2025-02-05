'use server';

import { createTransactionSchemaType, transactions } from './dummy';

export const newTransactionAction = async (
	transaction: createTransactionSchemaType
) => {
	//In the new transaction use case when the bucket is Goal then the transaction should update the allocation for the goal as well
	const newTransaction = {
		...transaction,
		id: transactions.length + 1,
	};
	transactions.push(newTransaction);
};
