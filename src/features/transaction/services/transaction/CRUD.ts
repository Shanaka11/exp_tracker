import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
	InsertTransactionDto,
	TransactionDto,
	TransactionTable,
} from '../../models/transaction';
import { desc, eq } from 'drizzle-orm';
import { generateDrizzleFilter } from 'drizzle-query-helper';

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
	if (filterString) {
		const query = connection.select().from(TransactionTable).$dynamic();
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilter(TransactionTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
		return await query.orderBy(desc(TransactionTable.date));
	}
};

export const updateTransactionService = async (
	transaction: TransactionDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	//In the new transaction use case when the bucket is Goal then the transaction should update the allocation for the goal as well
	const updatedTransaction = await connection
		.update(TransactionTable)
		.set({
			amount: transaction.amount,
			date: transaction.date,
			note: transaction.note,
			costBucketId: transaction.costBucketId,
			updatedAt: transaction.updatedAt,
			isExpense: transaction.isExpense,
		})
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
