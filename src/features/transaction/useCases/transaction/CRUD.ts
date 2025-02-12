import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InsertTransactionDto } from '../../models/transaction';
import { db } from '@/db/drizzle';
import { createTransactionService } from '../../services/transaction/CRUD';
import { updateGoalUseCase_ } from '@/features/goals/useCases/goal/CRUD';
import { getGoalFromIdUseCase } from '@/features/goals/useCases/goal/getGoalFromIdUsecase';

export const createTransactionUseCase_ = async (
	transaction: InsertTransactionDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// If the cost bucket is goal then update the goal allocated amount
	transaction.user = userId;
	const currDate = new Date();
	transaction.createdAt = currDate;
	transaction.updatedAt = currDate;
	const newTransaction = await createTransactionService(
		transaction,
		connection
	);

	if (transaction.note.startsWith(`ALLOCATED_TO_GOAL-`)) {
		// Then this is allocated to a goal
		const goalId = transaction.note.split('-')[1];
		const goal = await getGoalFromIdUseCase(Number(goalId), connection);
		goal.allocatedAmount += transaction.amount;
		await updateGoalUseCase_(goal, connection);
	}

	return newTransaction;
};

export const createTransactionUseCase = async (
	transaction: InsertTransactionDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	connection.transaction(async (tx) => {
		return createTransactionUseCase_(transaction, userId, tx);
	});
};
