'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getUserCostBucketUseCase } from '../useCases/costBucket/getUserCostBucketUseCase';

export const getUserCostBucketAction = async () => {
	const userId = getCurrentUserServer();
	return getUserCostBucketUseCase(userId);
};
