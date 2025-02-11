import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { GoalTable, InsertGoalDto } from '../../models/goal';
import { generateDrizzleFilter } from 'drizzle-query-helper';

export const getGoalService = async (
	connection: PostgresJsDatabase<Record<string, never>>,
	filterString?: string
) => {
	const query = connection.select().from(GoalTable).$dynamic();
	if (filterString) {
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilter(GoalTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
	}

	return await query;
};

export const createGoalService = async (
	goal: InsertGoalDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	return await connection.insert(GoalTable).values(goal).returning();
};
