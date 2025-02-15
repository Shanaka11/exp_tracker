'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { GoalDto } from '../models/goal';
import { updateGoalUseCase } from '../useCases/goal/CRUD';

export const updateGoalAction = async (goal: GoalDto) => {
	const user = getCurrentUserServer();
	return await updateGoalUseCase(goal, user);
};
