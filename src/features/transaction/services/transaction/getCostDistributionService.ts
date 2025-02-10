import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { TransactionTable } from '../../models/transaction';
import { eq, sum } from 'drizzle-orm';
import { CostBucketTable } from '../../models/costBucket';

export const getCostDistributionService = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	return await connection
		.select({
			costBucketName: CostBucketTable.name,
			total: sum(TransactionTable.amount),
		})
		.from(TransactionTable)
		.innerJoin(
			CostBucketTable,
			eq(TransactionTable.costBucketId, CostBucketTable.id)
		)
		.where(eq(TransactionTable.user, userId))
		.groupBy(CostBucketTable.name);
};
