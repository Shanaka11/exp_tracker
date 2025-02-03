import { z } from 'zod';
export type Transaction = {
	id: number;
	amount: number;
	date: Date;
	isExpense: boolean;
	costBucket: string;
	notes: string;
};

export const createTransactionSchema = z.object({
	id: z.number().optional(),
	amount: z.coerce.number(), // z.string().transform((v) => Number(v) || 0),
	date: z.date(),
	isExpense: z.boolean(),
	costBucket: z.string(),
	notes: z.string(),
});

export type createTransactionSchemaType = z.infer<
	typeof createTransactionSchema
>;

export const transactions: Transaction[] = [
	{
		id: 1,
		amount: 100.0,
		date: new Date('2021-09-01'),
		isExpense: true,
		costBucket: 'Groceries',
		notes: 'Bought some groceries',
	},
	{
		id: 2,
		amount: 50.0,
		date: new Date('2021-09-02'),
		isExpense: true,
		costBucket: 'Gas',
		notes: 'Filled up the tank',
	},
	{
		id: 3,
		amount: 200.0,
		date: new Date('2021-09-03'),
		isExpense: false,
		costBucket: 'Dining',
		notes: 'Ate out with friends',
	},
	{
		id: 4,
		amount: 1000.0,
		date: new Date('2021-09-04'),
		isExpense: false,
		costBucket: 'Salary',
		notes: 'Got paid for work',
	},
	{
		id: 5,
		amount: 500.0,
		date: new Date('2021-09-05'),
		isExpense: true,
		costBucket: 'Rent',
		notes: 'Paid rent for the month',
	},
	{
		id: 6,
		amount: 100.0,
		date: new Date('2021-09-06'),
		isExpense: true,
		costBucket: 'Groceries',
		notes: 'Bought some groceries',
	},
	{
		id: 7,
		amount: 50.0,
		date: new Date('2021-09-07'),
		isExpense: true,
		costBucket: 'Gas',
		notes: 'Filled up the tank',
	},
];
