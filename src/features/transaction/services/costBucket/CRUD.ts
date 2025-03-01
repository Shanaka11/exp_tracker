import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { generateDrizzleFilter } from 'drizzle-query-helper';
import {
	CostBucketDto,
	CostBucketTable,
	InsertCostBucketDto,
} from '../../models/costBucket';
import { desc, eq } from 'drizzle-orm';

export const createCostBucketService = async (
	costBucket: InsertCostBucketDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	const createdCostBucket = await connection
		.insert(CostBucketTable)
		.values(costBucket)
		.returning();
	return createdCostBucket;
};

export const getCostBucketService = async (
	connection: PostgresJsDatabase<Record<string, never>>,
	filterString?: string
) => {
	const query = connection.select().from(CostBucketTable).$dynamic();
	if (filterString) {
		//@ts-expect-error types not defined
		const filter = generateDrizzleFilter(CostBucketTable, filterString);
		if (filter !== null && filter !== undefined) {
			//@ts-expect-error types not defined
			query.where(filter);
		}
	}

	return await query.orderBy(desc(CostBucketTable.id));
};

export const updateCostBucketService = async (
	costBucket: CostBucketDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	const updatedCostBucket = await connection
		.update(CostBucketTable)
		.set({
			name: costBucket.name,
			description: costBucket.description,
			updatedAt: costBucket.updatedAt,
		})
		.where(eq(CostBucketTable.id, costBucket.id))
		.returning();
	return updatedCostBucket;
};

export const deleteCostBucketService = async (
	costBucket: CostBucketDto,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	const deletedCostBucket = await connection
		.delete(CostBucketTable)
		.where(eq(CostBucketTable.id, costBucket.id))
		.returning();
	return deletedCostBucket;
};
