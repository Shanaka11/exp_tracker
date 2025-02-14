'use client';
import { Button } from '@/components/ui/button';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import NewCostBucketDialog from './NewCostBucketDialog';
import { Dialog } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

const chartConfig = {
	total: {
		label: 'Amount',
	},
} satisfies ChartConfig;

type CostDistributionChartProps = {
	distribution: {
		costBucketName: string;
		total: string | null;
	}[];
};
const CostDistributionChart = ({
	distribution,
}: CostDistributionChartProps) => {
	const [open, setOpen] = useState(false);
	// If no data is available, show add cost buckets button
	const router = useRouter();
	const handleOnSaveSuccess = () => {
		setTimeout(() => {
			router.refresh();
		}, 1000);
	};
	if (distribution.length === 0) {
		return (
			<div className='h-full w-full grid items-center'>
				<Button size='lg' onClick={() => setOpen(true)}>
					<Plus /> Define Cost Buckets
				</Button>
				<Dialog open={open} onOpenChange={setOpen}>
					<NewCostBucketDialog handleOnSaveSuccess={handleOnSaveSuccess} />
				</Dialog>
			</div>
		);
	}
	// Show the cost distribution for the top 10 cost buckets in a bar chart
	return (
		<ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
			<BarChart accessibilityLayer data={distribution}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='costBucketName'
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 8)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Bar dataKey='total' fill='var(--color-desktop)' radius={4} />
			</BarChart>
		</ChartContainer>
	);
};

export default CostDistributionChart;
