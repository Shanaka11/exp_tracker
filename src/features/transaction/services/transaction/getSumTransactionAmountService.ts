import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { TransactionTable } from '../../models/transaction';
import { sum } from 'drizzle-orm';
import { generateDrizzleFilterPg } from 'drizzle-query-helper';

export const getSumTransactionAmountService = async (
	connection: PostgresJsDatabase<Record<string, never>>,
	filterString?: string
) => {
	const query = connection
		.select({ sum: sum(TransactionTable.amount) })
		.from(TransactionTable)
		.$dynamic();

	if (filterString) {
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilterPg(TransactionTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
	}

	return await query;
};
