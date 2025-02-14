import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InsertTransactionDto, TransactionDto } from '../../models/transaction';
import { db } from '@/db/drizzle';
import {
	createTransactionService,
	deleteTransactionService,
	getTransactionService,
	updateTransactionService,
} from '../../services/transaction/CRUD';
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

export const updateTransactionUseCase_ = async (
	transaction: TransactionDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// Get the old transaction
	const oldTransaction = await getTransactionService(
		connection,
		`eq(id,${transaction.id})`
	);

	if (oldTransaction === undefined || oldTransaction.length === 0) {
		throw new Error('Transaction not found');
	}

	if (oldTransaction[0].user !== userId) {
		throw new Error('Transaction is not owned by the user');
	}
	// Check the updated dates to see if the transaction is updated by someonelse
	if (
		oldTransaction[0].updatedAt.getTime() !== transaction.updatedAt.getTime()
	) {
		throw new Error('Transaction is updated by someone else');
	}
	// If yes then throw an error
	// If no then update the transaction
	transaction.updatedAt = new Date();
	const updatedTransaction = await updateTransactionService(
		transaction,
		connection
	);
	// If the bucket is goal then update the goal allocation as well
	if (transaction.note.startsWith(`ALLOCATED_TO_GOAL-`)) {
		// Then this is allocated to a goal
		const goalId = transaction.note.split('-')[1];
		const goal = await getGoalFromIdUseCase(Number(goalId), connection);
		goal.allocatedAmount +=
			updatedTransaction[0].amount - oldTransaction[0].amount;
		await updateGoalUseCase_(goal, connection);
	}
	return updatedTransaction;
};

export const deleteTransactionUseCase_ = async (
	transactions: TransactionDto[],
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	for (const transaction of transactions) {
		// Get the old transaction
		const oldTransaction = await getTransactionService(
			connection,
			`eq(id,${transaction.id})`
		);

		if (oldTransaction === undefined || oldTransaction.length === 0) {
			throw new Error('Transaction not found');
		}

		if (oldTransaction[0].user !== userId) {
			throw new Error('Transaction is not owned by the user');
		}
		// Check the updated dates to see if the transaction is updated by someonelse
		if (
			oldTransaction[0].updatedAt.getTime() !== transaction.updatedAt.getTime()
		) {
			throw new Error('Transaction is updated by someone else');
		}
		// If yes then throw an error
		// If no then delete the transaction
		const deletedTransaction = await deleteTransactionService(
			transaction,
			connection
		);
		// If the bucket is goal then update the goal allocation as well
		if (transaction.note.startsWith(`ALLOCATED_TO_GOAL-`)) {
			// Then this is allocated to a goal
			const goalId = transaction.note.split('-')[1];
			const goal = await getGoalFromIdUseCase(Number(goalId), connection);
			goal.allocatedAmount -= deletedTransaction[0].amount;
			await updateGoalUseCase_(goal, connection);
		}
	}
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

export const updateTransactionUseCase = async (
	transaction: TransactionDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	connection.transaction(async (tx) => {
		return updateTransactionUseCase_(transaction, userId, tx);
	});
};

export const deleteTransactionUseCase = async (
	transactions: TransactionDto[],
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	connection.transaction(async (tx) => {
		return deleteTransactionUseCase_(transactions, userId, tx);
	});
};
