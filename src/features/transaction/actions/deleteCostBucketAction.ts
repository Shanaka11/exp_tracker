'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { CostBucketDto } from '../models/costBucket';
import { deleteCostBucketsUserCase } from '../useCases/costBucket/CRUD';

export const deleteCostBucketAction = async (costBuckets: CostBucketDto[]) => {
	const user = getCurrentUserServer();
	return await deleteCostBucketsUserCase(costBuckets, user);
};
