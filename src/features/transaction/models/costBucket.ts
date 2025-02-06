import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const CostBucketTable = pgTable('cost_bucket', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: varchar('name', { length: 20 }).notNull(),
	description: varchar('description', { length: 100 }).notNull(),
	user: varchar('user_id', { length: 40 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertCostBucketDto = typeof CostBucketTable.$inferInsert;
export type CostBucketDto = typeof CostBucketTable.$inferSelect;

// export const ReadCommentSchema = createSelectSchema(CommentTable);
export const CreateCostBucketSchema = createInsertSchema(CostBucketTable);
