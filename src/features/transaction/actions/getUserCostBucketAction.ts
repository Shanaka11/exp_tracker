'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getUserCostBucketUseCase } from '../useCases/costBucket/getUserCostBucketUseCase';

export const getUserCostBucketAction = async (
	filterString?: string,
	demo?: boolean
) => {
	const userId = await getCurrentUserServer(demo);
	return getUserCostBucketUseCase(userId, filterString);
};
