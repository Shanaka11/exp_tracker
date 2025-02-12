import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { TransactionTable } from '../../models/transaction';
import { desc, eq } from 'drizzle-orm';
import { CostBucketTable } from '../../models/costBucket';
import { generateDrizzleFilter } from 'drizzle-query-helper';

export const getTransactionWithGoalNames = async (
	connection: PostgresJsDatabase<Record<string, never>>,
	filterString?: string
) => {
	if (filterString) {
		const query = connection
			.select({
				id: TransactionTable.id,
				date: TransactionTable.date,
				amount: TransactionTable.amount,
				isExpense: TransactionTable.isExpense,
				note: TransactionTable.note,
				costBucketId: TransactionTable.costBucketId,
				costBucketName: CostBucketTable.name,
				user: TransactionTable.user,
				createdAt: TransactionTable.createdAt,
				updatedAt: TransactionTable.updatedAt,
			})
			.from(TransactionTable)
			.innerJoin(
				CostBucketTable,
				eq(TransactionTable.costBucketId, CostBucketTable.id)
			)
			.$dynamic();
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilter(TransactionTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
		return await query.orderBy(desc(TransactionTable.date));
	}
};
