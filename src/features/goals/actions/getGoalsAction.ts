'use server';
import { goals } from './dummy';

export const getGoalsAction = async () => {
	return goals;
};
