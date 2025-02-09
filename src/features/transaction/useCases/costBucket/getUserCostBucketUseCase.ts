import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getCostBucketService } from '../../services/costBucket/CRUD';
import { db } from '@/db/drizzle';

export const getUserCostBucketUseCase = async (
	userId: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	const costBuckets = await getCostBucketService(
		connection,
		`and(eq(user,${userId}))`
	);
	return costBuckets;
};
