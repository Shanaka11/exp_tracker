'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { InsertCostBucketDto } from '../models/costBucket';
import { createCostBucketUseCase } from '../useCases/costBucket/CRUD';

export const newCostBucketAction = async (
	costBucket: InsertCostBucketDto,
	demo?: boolean
) => {
	const user = await getCurrentUserServer(demo);
	await createCostBucketUseCase(costBucket, user);
};
