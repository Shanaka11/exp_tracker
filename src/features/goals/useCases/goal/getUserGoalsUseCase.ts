import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getGoalService } from '../../services/goal/CRUD';

export const getUserGoalUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return await getGoalService(connection, `eq(user,${userId})`);
};
