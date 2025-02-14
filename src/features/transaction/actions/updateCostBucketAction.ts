'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { CostBucketDto } from '../models/costBucket';
import { updateCostBucketUseCase } from '../useCases/costBucket/CRUD';

export const updateCostBucketAction = async (costBucket: CostBucketDto) => {
	const user = getCurrentUserServer();
	return await updateCostBucketUseCase(costBucket, user);
};
