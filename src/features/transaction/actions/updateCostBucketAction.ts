'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { CostBucketDto } from '../models/costBucket';
import { updateCostBucketUseCase } from '../useCases/costBucket/CRUD';

export const updateCostBucketAction = async (
	costBucket: CostBucketDto,
	demo?: boolean
) => {
	const user = getCurrentUserServer(demo);
	return await updateCostBucketUseCase(costBucket, user);
};
