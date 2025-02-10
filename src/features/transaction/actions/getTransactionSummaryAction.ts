'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getTransactionSummaryUseCase } from '../useCases/transaction/getTransactionSummaryUseCase';

export const getTransactionSummaryAction = async () => {
	const user = getCurrentUserServer();
	return await getTransactionSummaryUseCase(user);
};
