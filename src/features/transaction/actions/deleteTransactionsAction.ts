'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { TransactionDto } from '../models/transaction';
import { deleteTransactionUseCase } from '../useCases/transaction/CRUD';

export const deleteTransactionsAction = async (
	transactions: TransactionDto[],
	demo?: boolean
) => {
	const user = await getCurrentUserServer(demo);
	return await deleteTransactionUseCase(transactions, user);
};
