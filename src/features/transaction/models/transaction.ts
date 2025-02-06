import {
	doublePrecision,
	integer,
	pgTable,
	varchar,
	boolean,
	timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { CostBucketTable } from './costBucket';
import { z } from 'zod';

export const TransactionTable = pgTable('transaction', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	amount: doublePrecision('amount').notNull(),
	date: timestamp('date').notNull(),
	isExpense: boolean('is_expense').notNull(),
	costBucketId: integer('cost_bucket_id')
		.notNull()
		.references(() => CostBucketTable.id),
	user: varchar('user_id', { length: 40 }).notNull(),
	note: varchar('note', { length: 100 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertTransactionDto = typeof TransactionTable.$inferInsert;
export type TransactionDto = typeof TransactionTable.$inferSelect;

// export const ReadCommentSchema = createSelectSchema(CommentTable);
const InsertTransactionSchema_ = createInsertSchema(TransactionTable);
export const InsertTransactionSchema = InsertTransactionSchema_.extend({
	amount: z.coerce.number(),
	costBucketId: z.coerce.number(),
});
