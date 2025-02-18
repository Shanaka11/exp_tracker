import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getGoalService } from '../../services/goal/CRUD';

export const getUserGoalUseCase = async (
	userId: string,
	filterString?: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return await getGoalService(
		connection,
		filterString
			? `and(eq(user,${userId}),${filterString})`
			: `eq(user,${userId})`
	);
};
