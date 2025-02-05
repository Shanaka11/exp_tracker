export type Goal = {
	id: number;
	title: string;
	user: string;
	targetAmount: number;
	allocatedAmount: number;
	targetDate: Date;
	icon: string;
};

export const goals: Goal[] = [
	{
		id: 1,
		title: 'Buy a house',
		user: 'John Doe',
		targetAmount: 1000000,
		allocatedAmount: 500000,
		targetDate: new Date('2025-12-31'),
		icon: 'house',
	},
	{
		id: 2,
		title: 'Buy a car',
		user: 'John Doe',
		targetAmount: 50000,
		allocatedAmount: 35000,
		targetDate: new Date('2022-12-31'),
		icon: 'car',
	},
];
