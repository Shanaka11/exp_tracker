'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getRecentTransactionsUseCase } from '../useCases/transaction/getRecentTransactions';

export const getTransactionsAction = async () => {
	const user = getCurrentUserServer();
	return await getRecentTransactionsUseCase(user);
};
