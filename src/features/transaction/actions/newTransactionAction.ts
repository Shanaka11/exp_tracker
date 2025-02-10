'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { InsertTransactionDto } from '../models/transaction';
import { createTransactionUseCase } from '../useCases/transaction/CRUD';

export const newTransactionAction = async (
	transaction: InsertTransactionDto
) => {
	const user = getCurrentUserServer();
	return await createTransactionUseCase(transaction, user);
};
