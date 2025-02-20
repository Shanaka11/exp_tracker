'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getTransactionSummaryUseCase } from '../useCases/transaction/getTransactionSummaryUseCase';

export const getTransactionSummaryAction = async (demo?: boolean) => {
	console.log(demo);
	// If boolean, get some dummy data
	const user = getCurrentUserServer();
	return await getTransactionSummaryUseCase(user);
};
