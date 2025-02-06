import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getSumTransactionAmountService } from '../../services/transaction/getSumTransactionAmountService';

export const getTransactionSummaryUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	const expense = await getSumTransactionAmountService(
		connection,
		`and(eq(user,${userId}),eq(isExpense,${true}))`
	);
	const income = await getSumTransactionAmountService(
		connection,
		`and(eq(user,${userId}),eq(isExpense,${false}))`
	);
	const allocated = 0;

	return {
		totalExpense: parseFloat(expense[0].sum ?? '0'),
		totalIncome: parseFloat(income[0].sum ?? '0'),
		allocated: allocated ?? 0,
	};
};
