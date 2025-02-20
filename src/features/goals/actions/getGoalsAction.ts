'use server';
import { getCurrentUserServer } from '@/features/auth/util/getCurrentUserServer';
import { getUserGoalUseCase } from '../useCases/goal/getUserGoalsUseCase';

export const getGoalsAction = async (filterString?: string, demo?: boolean) => {
	const user = await getCurrentUserServer(demo);
	return await getUserGoalUseCase(user, filterString);
};
