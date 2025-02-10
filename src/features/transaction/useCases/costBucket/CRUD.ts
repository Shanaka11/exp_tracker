import { db } from '@/db/drizzle';
import { InsertCostBucketDto } from '../../models/costBucket';
import {
	createCostBucketService,
	getCostBucketService,
} from '../../services/costBucket/CRUD';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export const createCostBucketUseCase = async (
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

	return await createCostBucketService(costBucket, connection);
};
