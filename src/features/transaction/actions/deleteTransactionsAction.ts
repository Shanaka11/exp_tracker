'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { TransactionDto } from '../models/transaction';
import { deleteTransactionUseCase } from '../useCases/transaction/CRUD';

export const deleteTransactionsAction = async (
	transactions: TransactionDto[]
) => {
	const user = getCurrentUserServer();
	return await deleteTransactionUseCase(transactions, user);
};
