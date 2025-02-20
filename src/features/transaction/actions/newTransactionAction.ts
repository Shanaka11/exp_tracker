'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { InsertTransactionDto } from '../models/transaction';
import { createTransactionUseCase } from '../useCases/transaction/CRUD';

export const newTransactionAction = async (
	transaction: InsertTransactionDto,
	demo?: boolean
) => {
	const user = getCurrentUserServer(demo);
	return await createTransactionUseCase(transaction, user);
};
