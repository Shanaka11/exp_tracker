'use server';
import { getRecentTransactionsUseCase } from '../useCases/transaction/getRecentTransactions';

export const getTransactionsAction = async () => {
	return await getRecentTransactionsUseCase('demoU');
};
