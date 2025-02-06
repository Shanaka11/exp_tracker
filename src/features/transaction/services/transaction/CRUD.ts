import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
	InsertTransactionDto,
	TransactionDto,
	TransactionTable,
} from '../../models/transaction';
import { eq } from 'drizzle-orm';
import { generateDrizzleFilterPg } from 'drizzle-query-helper';

export const createTransactionService = async (
	transaction: InsertTransactionDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	//In the new transaction use case when the bucket is Goal then the transaction should update the allocation for the goal as well
	const createdTransaction = await connection
		.insert(TransactionTable)
		.values(transaction)
		.returning();
	return createdTransaction;
};

export const getTransactionService = async (
	connection: PostgresJsDatabase<Record<string, never>>,
	filterString?: string
) => {
	const query = connection.select().from(TransactionTable).$dynamic();
	if (filterString) {
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilterPg(TransactionTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
		return await query;
	}
};

export const updateTransactionService = async (
	transaction: TransactionDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	//In the new transaction use case when the bucket is Goal then the transaction should update the allocation for the goal as well
	const updatedTransaction = await connection
		.update(TransactionTable)
		.set(transaction)
		.where(eq(TransactionTable.id, transaction.id))
		.returning();
	return updatedTransaction;
};

export const deleteTransactionService = async (
	transaction: TransactionDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	//In the new transaction use case when the bucket is Goal then the transaction should update the allocation for the goal as well
	const deletedTransaction = await connection
		.delete(TransactionTable)
		.where(eq(TransactionTable.id, transaction.id))
		.returning();
	return deletedTransaction;
};
