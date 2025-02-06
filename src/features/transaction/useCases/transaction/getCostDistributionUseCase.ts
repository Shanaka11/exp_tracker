import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getCostDistributionService } from '../../services/transaction/getCostDistributionService';
import { db } from '@/db/drizzle';

export const getCostDistributionUseCase = async (
	user: string,
	connection: PostgresJsDatabase<Record<string, never>> = db
) => {
	return await getCostDistributionService(user, connection);
};
