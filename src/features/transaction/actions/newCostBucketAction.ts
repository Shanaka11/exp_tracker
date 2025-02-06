'use server';

import { InsertCostBucketDto } from '../models/costBucket';
import { createCostBucketUseCase } from '../useCases/costBucket/CRUD';

export const newCostBucketAction = async (costBucket: InsertCostBucketDto) => {
	await createCostBucketUseCase(costBucket, 'tempU');
};
