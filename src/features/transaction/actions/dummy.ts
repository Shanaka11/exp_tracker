export type Transaction = {
	id: number;
	amount: number;
	date: Date;
	isExpense: boolean;
	costBucket: string;
	notes: string;
};

export const transactions: Transaction[] = [
	{
		id: 1,
		amount: 100,
		date: new Date('2021-09-01'),
		isExpense: true,
		costBucket: 'Groceries',
		notes: 'Bought some groceries',
	},
	{
		id: 2,
		amount: 50,
		date: new Date('2021-09-02'),
		isExpense: true,
		costBucket: 'Gas',
		notes: 'Filled up the tank',
	},
	{
		id: 3,
		amount: 200,
		date: new Date('2021-09-03'),
		isExpense: true,
		costBucket: 'Dining',
		notes: 'Ate out with friends',
	},
	{
		id: 4,
		amount: 1000,
		date: new Date('2021-09-04'),
		isExpense: false,
		costBucket: 'Salary',
		notes: 'Got paid for work',
	},
	{
		id: 5,
		amount: 500,
		date: new Date('2021-09-05'),
		isExpense: true,
		costBucket: 'Rent',
		notes: 'Paid rent for the month',
	},
	{
		id: 6,
		amount: 100,
		date: new Date('2021-09-06'),
		isExpense: true,
		costBucket: 'Groceries',
		notes: 'Bought some groceries',
	},
	{
		id: 7,
		amount: 50,
		date: new Date('2021-09-07'),
		isExpense: true,
		costBucket: 'Gas',
		notes: 'Filled up the tank',
	},
];
