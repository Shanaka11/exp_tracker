import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InsertGoalDto } from '../../models/goal';
import { createGoalService } from '../../services/goal/CRUD';

export const createGoalUseCase = async (
	goal: InsertGoalDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	goal.user = userId;
	const currDate = new Date();
	goal.createdAt = currDate;
	goal.updatedAt = currDate;
	await createGoalService(goal, connection);
};
