'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getRecentTransactionsUseCase } from '../useCases/transaction/getRecentTransactions';
import { getAllTransactionsUseCase } from '../useCases/transaction/getAllTransactionsUseCase';

export const getTransactionsAction = async (
	recent: boolean = true,
	filterString?: string
) => {
	const user = getCurrentUserServer();
	if (recent) {
		return await getRecentTransactionsUseCase(user);
	} else {
		return await getAllTransactionsUseCase(user, filterString);
	}
};
