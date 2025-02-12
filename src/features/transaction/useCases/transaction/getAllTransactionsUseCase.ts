import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getTransactionService } from '../../services/transaction/CRUD';
import { db } from '@/db/drizzle';

export const getAllTransactionsUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return await getTransactionService(connection, `eq(user,${userId})`);
};
