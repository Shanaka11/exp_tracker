'use client';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
	{ costBucket: 'Groceries', amount: 186 },
	{ costBucket: 'Car', amount: 305 },
	{ costBucket: 'Entertainment', amount: 237 },
	{ costBucket: 'Clothing', amount: 73 },
	{ costBucket: 'Vacation', amount: 209 },
	{ costBucket: 'EatingOut', amount: 214 },
];

const chartConfig = {
	amount: {
		label: 'Amount',
	},
} satisfies ChartConfig;

const CostDistributionChart = () => {
	// Show the cost distribution for the top 10 cost buckets in a bar chart
	return (
		<ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='costBucket'
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Bar dataKey='amount' fill='var(--color-desktop)' radius={4} />
			</BarChart>
		</ChartContainer>
	);
};

export default CostDistributionChart;
