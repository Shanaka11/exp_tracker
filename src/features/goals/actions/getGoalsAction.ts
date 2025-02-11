'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getUserGoalUseCase } from '../useCases/goal/getUserGoalsUseCase';

export const getGoalsAction = async () => {
	const user = getCurrentUserServer();
	return await getUserGoalUseCase(user);
};
