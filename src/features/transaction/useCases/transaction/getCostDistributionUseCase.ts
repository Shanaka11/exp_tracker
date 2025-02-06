import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getCostDistributionService } from '../../services/transaction/getCostDistributionService';

export const getCostDistributionUseCase = async (
	user: string,
	connection: PostgresJsDatabase<Record<string, never>>
) => {
	return await getCostDistributionService(user, connection);
};
