import { db } from '@/db/drizzle';
import { CostBucketDto, InsertCostBucketDto } from '../../models/costBucket';
import {
	createCostBucketService,
	deleteCostBucketService,
	getCostBucketService,
	updateCostBucketService,
} from '../../services/costBucket/CRUD';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export const createCostBucketUseCase_ = async (
	costBucket: InsertCostBucketDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// Cost bucket Goal is a system bucket, users cannot enter it
	if (costBucket.name === 'Goal') {
		throw new Error('Creating a cost bucket with the name Goal is not allowed');
	}
	// Check if a cost bucket with the same name for the same user already exists
	const existCostBucket = await getCostBucketService(
		connection,
		`and(eq(user,${userId}),eq(name,${costBucket.name}))`
	);

	if (existCostBucket.length > 0) {
		throw new Error('Cost bucket with the same name already exists for you');
	}

	// Add the created at and updated at fields
	const currDate = new Date();
	costBucket.createdAt = currDate;
	costBucket.updatedAt = currDate;
	costBucket.user = userId;

	return await createCostBucketService(costBucket, connection);
};

export const updateCostBucketUseCase_ = async (
	costBucket: CostBucketDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	// If the cost bucket is goal then cannot update
	if (costBucket.name === 'Goal') {
		throw new Error(
			'Updating the cost bucket with the name Goal is not allowed'
		);
	}
	// Check if a cost bucket with the same name for the same user already exists
	const existCostBucket = await getCostBucketService(
		connection,
		`and(eq(user,${userId}),eq(name,${costBucket.name}))`
	);

	if (existCostBucket.length > 0) {
		throw new Error('Cost bucket with the same name already exists for you');
	}

	// Get the old cost bucket
	const oldCostBucket = await getCostBucketService(
		connection,
		`eq(id,${costBucket.id})`
	);
	// Check if the cost bucket exists
	if (oldCostBucket.length === 0) {
		throw new Error('Cost bucket not found');
	}
	// Check if the cost bucket is owned by the user
	if (oldCostBucket[0].user !== userId) {
		throw new Error('Cost bucket is not owned by the user');
	}
	// Check the updated dates to see if the cost bucket is updated by someonelse
	if (oldCostBucket[0].updatedAt.getTime() !== costBucket.updatedAt.getTime()) {
		throw new Error('Cost bucket is updated by someone else');
	}

	return await updateCostBucketService(costBucket, connection);
};

export const deleteCostBucketsUserCase_ = async (
	costBuckets: CostBucketDto[],
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	for (const costBucket of costBuckets) {
		// Check if the cost bucket is owned by the user
		if (costBucket.user !== userId) {
			throw new Error('Cost bucket is not owned by the user');
		}
		// Check if the cost bucket is system bucket
		if (costBucket.name === 'Goal') {
			throw new Error(
				'Deleting the cost bucket with the name Goal is not allowed'
			);
		}

		const oldCostBucket = await getCostBucketService(
			connection,
			`eq(id,${costBucket.id})`
		);

		if (oldCostBucket.length === 0) {
			throw new Error('Cost bucket not found');
		}

		if (
			oldCostBucket[0].updatedAt.getTime() !== costBucket.updatedAt.getTime()
		) {
			throw new Error('Cost bucket is updated by someone else');
		}

		await deleteCostBucketService(costBucket, connection);
	}
};

export const createCostBucketUseCase = async (
	costBucket: InsertCostBucketDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return connection.transaction(async (tx) => {
		return await createCostBucketUseCase_(costBucket, userId, tx);
	});
};

export const updateCostBucketUseCase = async (
	costBucket: CostBucketDto,
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return connection.transaction(async (tx) => {
		try {
			await updateCostBucketUseCase_(costBucket, userId, tx);
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(e);
				return {
					error: e.message,
				};
			}
			return {
				error: 'An unexpected error occurred, try again',
			};
		}
	});
};

export const deleteCostBucketsUserCase = async (
	constBuckets: CostBucketDto[],
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return connection.transaction(async (tx) => {
		try {
			await deleteCostBucketsUserCase_(constBuckets, userId, tx);
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(e);
				return {
					error: e.message,
				};
			}
			return {
				error: 'An unexpected error occurred, try again',
			};
		}
	});
};
