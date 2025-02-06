import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { TransactionTable } from '../../models/transaction';
import { eq, sum } from 'drizzle-orm';

export const getCostDistributionService = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	return await connection
		.select({
			costBucketId: TransactionTable.costBucketId,
			total: sum(TransactionTable.amount),
		})
		.from(TransactionTable)
		.where(eq(TransactionTable.user, userId))
		.groupBy(TransactionTable.costBucketId);
};
