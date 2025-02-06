import {
	decimal,
	integer,
	pgTable,
	varchar,
	date,
	boolean,
	timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { CostBucketTable } from './costBucket';

export const TransactionTable = pgTable('transaction', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
	date: date('date').notNull(),
	isExpense: boolean('is_expense').notNull(),
	costBucketId: integer('cost_bucket_id')
		.notNull()
		.references(() => CostBucketTable.id),
	user: varchar('user_id', { length: 40 }).notNull(),
	note: varchar('note', { length: 100 }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertTransactionDto = typeof TransactionTable.$inferInsert;
export type CommentDto = typeof TransactionTable.$inferSelect;

// export const ReadCommentSchema = createSelectSchema(CommentTable);
export const CreateTransactionSchema = createInsertSchema(TransactionTable);
