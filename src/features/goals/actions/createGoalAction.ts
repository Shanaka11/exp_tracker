'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { InsertGoalDto } from '../models/goal';
import { createGoalUseCase } from '../useCases/goal/CRUD';

export const createGoalAction = async (goal: InsertGoalDto) => {
	const userId = getCurrentUserServer();
	return await createGoalUseCase(goal, userId);
};
