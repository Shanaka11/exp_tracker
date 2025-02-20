'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getTransactionSummaryUseCase } from '../useCases/transaction/getTransactionSummaryUseCase';

export const getTransactionSummaryAction = async (demo?: boolean) => {
	// If boolean, get some dummy data
	const user = getCurrentUserServer(demo);
	return await getTransactionSummaryUseCase(user);
};
