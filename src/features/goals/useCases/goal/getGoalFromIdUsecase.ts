import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getGoalService } from '../../services/goal/CRUD';
import { db } from '@/db/drizzle';

export const getGoalFromIdUseCase = async (
	id: number,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	const result = await getGoalService(connection, `eq(id,${id})`);
	return result[0];
};
