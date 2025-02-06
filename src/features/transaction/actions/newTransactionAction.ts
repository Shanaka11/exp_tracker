'use server';

import { InsertTransactionDto } from '../models/transaction';
import { createTransactionUseCase } from '../useCases/transaction/CRUD';

export const newTransactionAction = async (
	transaction: InsertTransactionDto
) => {
	return await createTransactionUseCase(transaction, 'demoU');
};
