import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { db } from '@/db/drizzle';
import { getTransactionWithGoalNames } from '../../services/transaction/getTransactionWithGoalNames';

export const getAllTransactionsUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return await getTransactionWithGoalNames(connection, `eq(user,${userId})`);
};
