'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { InsertGoalDto } from '../models/goal';
import { createGoalUseCase } from '../useCases/goal/CRUD';

export const createGoalAction = async (goal: InsertGoalDto, demo?: boolean) => {
	const userId = getCurrentUserServer(demo);
	return await createGoalUseCase(goal, userId);
};
