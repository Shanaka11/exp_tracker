import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { TransactionTable } from '../../models/transaction';
import { desc, eq } from 'drizzle-orm';

export const getRecentTransactionsService = (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>>,
	count: number
) => {
	return connection
		.select()
		.from(TransactionTable)
		.where(eq(TransactionTable.user, userId))
		.orderBy(desc(TransactionTable.date))
		.limit(count);
};
