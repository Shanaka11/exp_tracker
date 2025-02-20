'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getCostDistributionUseCase } from '../useCases/transaction/getCostDistributionUseCase';

export const getCostDistributionAction = async (demo?: boolean) => {
	// return await
	// Get Cost Buckets
	// get The Distribution
	const user = await getCurrentUserServer(demo);
	return getCostDistributionUseCase(user);
};
