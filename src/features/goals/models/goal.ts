import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const GoalTable = pgTable('goal', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	title: varchar('title', { length: 100 }).notNull(),
	user: varchar('user_id', { length: 40 }).notNull(),
	targetAmount: integer('target_amount').notNull(),
	allocatedAmount: integer('allocated_amount').notNull(),
	targetDate: timestamp('target_date').notNull(),
	icon: varchar('icon', { length: 20 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertGoalDto = typeof GoalTable.$inferInsert;
export type GoalDto = typeof GoalTable.$inferSelect;

const CreateGoalSchema_ = createInsertSchema(GoalTable);
export const CreateGoalSchema = CreateGoalSchema_.extend({
	title: z.string().min(1, { message: 'Title is required' }),
	targetAmount: z.coerce
		.number()
		.min(1, { message: 'Target amount must be greater than 0' }),
	allocatedAmount: z.coerce
		.number()
		.min(0, { message: 'Allocated amount must be greater than or equal to 0' }),
});
