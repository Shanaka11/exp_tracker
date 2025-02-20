'use server';

import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { GoalDto } from '../models/goal';
import { deleteGoalUseCase } from '../useCases/goal/CRUD';

export const deleteGoalAction = async (goals: GoalDto[], demo?: boolean) => {
	const user = getCurrentUserServer(demo);
	return await deleteGoalUseCase(goals, user);
};
