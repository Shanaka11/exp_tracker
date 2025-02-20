import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getSumTransactionAmountService } from '../../services/transaction/getSumTransactionAmountService';
import { getGoalCostBucketUseCase } from '../costBucket/getGoalCostBucketUseCase';

export const getTransactionSummaryUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	const expense = await getSumTransactionAmountService(
		connection,
		`and(eq(user,${userId}),eq(isExpense,true))`
	);
	const income = await getSumTransactionAmountService(
		connection,
		`and(eq(user,${userId}),eq(isExpense,false))`
	);
	const goalCostBucket = await getGoalCostBucketUseCase(connection);
	if (goalCostBucket.length === 0) {
		throw new Error('No goal cost bucket found');
	}
	const allocated = await getSumTransactionAmountService(
		connection,
		`and(eq(user,${userId}),eq(costBucketId,${goalCostBucket[0].id}))`
	);

	return {
		totalExpense: parseFloat(expense[0].sum ?? '0'),
		totalIncome: parseFloat(income[0].sum ?? '0'),
		allocated: parseFloat(allocated[0].sum ?? '0'),
	};
};
