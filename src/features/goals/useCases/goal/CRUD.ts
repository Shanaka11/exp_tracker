import { db } from '@/db/drizzle';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { GoalDto, InsertGoalDto } from '../../models/goal';
import {
	createGoalService,
	getGoalService,
	updateGoalService,
} from '../../services/goal/CRUD';
import { createTransactionService } from '@/features/transaction/services/transaction/CRUD';
import { InsertTransactionDto } from '@/features/transaction/models/transaction';
import { getGoalCostBucketUseCase } from '@/features/transaction/useCases/costBucket/getGoalCostBucketUseCase';

export const createGoalUseCase_ = async (
	goal: InsertGoalDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// If a goal with the same name exist for the same user, throw an error
	const existGoal = await getGoalService(
		connection,
		`and(eq(user,${userId}),eq(title,${goal.title}))`
	);
	if (existGoal.length > 0) {
		throw new Error('Goal with the same name already exists for you');
	}

	const currDate = new Date();
	goal.user = userId;
	goal.createdAt = currDate;
	goal.updatedAt = currDate;
	const allocatedAmount = goal.allocatedAmount;
	goal.allocatedAmount = 0;
	const createdGoal = await createGoalService(goal, connection);

	// If a goal comes with an allocated amount, then create a transaction for it
	if (allocatedAmount > 0) {
		// Get the bucket for the goal
		const goalBucket = await getGoalCostBucketUseCase(connection);
		// Create a transaction for the goal
		const transaction: InsertTransactionDto = {
			amount: goal.allocatedAmount,
			costBucketId: goalBucket[0].id,
			user: userId,
			isExpense: true,
			note: `ALLOCATED_TO_GOAL-${createdGoal[0].id}`,
			date: currDate,
		};
		await createTransactionService(transaction, connection);
	}
};

export const updateGoalUseCase_ = async (
	goal: GoalDto,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// get the goal before updating
	const oldGoal = await getGoalService(connection, `and(eq(id,${goal.id}))`);
	if (oldGoal[0].updatedAt.getTime !== goal.updatedAt.getTime) {
		throw new Error('Goal has been updated by another user');
	}
	// Update the goal
	goal.updatedAt = new Date();
	return await updateGoalService(goal, connection);
};

// Public use cases
export const createGoalUseCase = async (
	goal: InsertGoalDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	connection.transaction(async (tx) => {
		await createGoalUseCase_(goal, userId, tx);
	});
};
