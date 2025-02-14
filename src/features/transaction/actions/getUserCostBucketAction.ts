'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getUserCostBucketUseCase } from '../useCases/costBucket/getUserCostBucketUseCase';

export const getUserCostBucketAction = async (filterString?: string) => {
	console.log(filterString);
	const userId = getCurrentUserServer();
	return getUserCostBucketUseCase(userId);
};
