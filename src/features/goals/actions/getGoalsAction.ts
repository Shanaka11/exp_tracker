'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getUserGoalUseCase } from '../useCases/goal/getUserGoalsUseCase';

export const getGoalsAction = async (filterString?: string) => {
	console.log(filterString);
	const user = getCurrentUserServer();
	return await getUserGoalUseCase(user);
};
