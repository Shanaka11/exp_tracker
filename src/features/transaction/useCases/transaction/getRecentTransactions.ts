import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getRecentTransactionsService } from '../../services/transaction/getRecentTransactionsService';

export const getRecentTransactionsUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db,
	count?: number
) => {
	return await getRecentTransactionsService(userId, connection, count ?? 10);
};
