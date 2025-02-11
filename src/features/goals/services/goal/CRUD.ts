import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { GoalDto, GoalTable, InsertGoalDto } from '../../models/goal';
import { generateDrizzleFilter } from 'drizzle-query-helper';
import { eq } from 'drizzle-orm';

export const getGoalService = async (
	connection: PostgresJsDatabase<Record<string, never>>,
	filterString?: string
) => {
	console.log(filterString);
	const query = connection.select().from(GoalTable).$dynamic();
	if (filterString) {
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilter(GoalTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
	}
	const result = await query;

	return result;
};

export const createGoalService = async (
	goal: InsertGoalDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	return await connection.insert(GoalTable).values(goal).returning();
};

export const updateGoalService = async (
	goal: GoalDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	return await connection
		.update(GoalTable)
		.set({
			title: goal.title,
			updatedAt: goal.updatedAt,
			icon: goal.icon,
			targetAmount: goal.targetAmount,
			targetDate: goal.targetDate,
			allocatedAmount: goal.allocatedAmount,
		})
		.where(eq(GoalTable.id, goal.id))
		.returning();
};
