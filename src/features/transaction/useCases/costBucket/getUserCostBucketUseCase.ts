import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getCostBucketService } from '../../services/costBucket/CRUD';
import { db } from '@/db/drizzle';

export const getUserCostBucketUseCase = async (
	userId: string,
	filterString?: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	const costBuckets = await getCostBucketService(
		connection,
		filterString
			? `and(eq(user,${userId}),${filterString})`
			: `eq(user,${userId})`
	);
	return costBuckets;
};
