'use server';
import { getGoalCostBucketUseCase } from '../useCases/costBucket/getGoalCostBucketUseCase';

export const getCostBucketGoalAction = async () => {
	return await getGoalCostBucketUseCase();
};
