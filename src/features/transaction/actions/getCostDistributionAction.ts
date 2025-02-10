'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getCostDistributionUseCase } from '../useCases/transaction/getCostDistributionUseCase';

export const getCostDistributionAction = async () => {
	// return await
	// Get Cost Buckets
	// get The Distribution
	const user = getCurrentUserServer();
	return getCostDistributionUseCase(user);
};
