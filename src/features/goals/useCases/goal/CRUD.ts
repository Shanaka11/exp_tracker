import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InsertGoalDto } from '../../models/goal';
import { createGoalService } from '../../services/goal/CRUD';

export const createGoalUseCase = async (
	goal: InsertGoalDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// If a goal with the same name exist for the same user, throw an error
	// If a goal comes with an allocated amount, then create a transaction for it
	goal.user = userId;
	const currDate = new Date();
	goal.createdAt = currDate;
	goal.updatedAt = currDate;
	await createGoalService(goal, connection);
};
