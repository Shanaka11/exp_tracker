'use server';

import { getTransactionSummaryUseCase } from '../useCases/transaction/getTransactionSummaryUseCase';

export const getTransactionSummaryAction = async () => {
	return await getTransactionSummaryUseCase('demoU');
};
