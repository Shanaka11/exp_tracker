import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { db } from '@/db/drizzle';
import { getTransactionWithGoalNames } from '../../services/transaction/getTransactionWithGoalNames';

export const getAllTransactionsUseCase = async (
	userId: string,
	filterString?: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	if (filterString !== undefined) {
		return await getTransactionWithGoalNames(
			connection,
			`and(eq(user,${userId}),${filterString})`
		);
	}
	return await getTransactionWithGoalNames(connection, `eq(user,${userId})`);
};
