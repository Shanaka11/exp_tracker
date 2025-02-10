import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getCostBucketService } from '../../services/costBucket/CRUD';
import { db } from '@/db/drizzle';

export const getGoalCostBucketUseCase = async (
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	const costBucket = await getCostBucketService(connection, `eq(name,Goal)`);
	return costBucket;
};
