'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { TransactionDto } from '../models/transaction';
import { updateTransactionUseCase } from '../useCases/transaction/CRUD';

export const updateTransactionAction = async (transaction: TransactionDto) => {
	const user = getCurrentUserServer();
	return await updateTransactionUseCase(transaction, user);
};
