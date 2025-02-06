import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InsertTransactionDto } from '../../models/transaction';
import { db } from '@/db/drizzle';
import { createTransactionService } from '../../services/transaction/CRUD';

export const createTransactionUseCase = async (
	transaction: InsertTransactionDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	transaction.user = userId;
	const currDate = new Date();
	transaction.createdAt = currDate;
	transaction.updatedAt = currDate;
	await createTransactionService(transaction, connection);
};
