import { Button } from '@/components/ui/button';
import DateFilter from '@/features/ui/common/TableFilters/DateFilter';
import NumberFilter from '@/features/ui/common/TableFilters/NumberFilter';
import TextFilter from '@/features/ui/common/TableFilters/TextFilter';
import {
	generateDateFilterString,
	generateNumberFilterString,
} from '@/lib/tableFilterUtils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

const GoalTableFilter = () => {
	const [title, setTitle] = useState('');
	const [allocatedAmount, setAllocatedAmount] = useState('');
	const [targetAmount, setTargetAmount] = useState('');
	const [targetDate, setTargetDate] = useState<DateRange | undefined>();
	const router = useRouter();

	const clearFilter = () => {
		setTitle('');
		setAllocatedAmount('');
		setTargetAmount('');
		setTargetDate(undefined);
		router.push('/goals');
	};

	const applyFilter = () => {
		const filterStringArray: string[] = [];
		// Title
		if (title !== '') {
			filterStringArray.push(`ilike(title,${title})`);
		}
		// Target Amount
		if (targetAmount !== '') {
			filterStringArray.push(
				encodeURIComponent(
					generateNumberFilterString('targetAmount', targetAmount)
				)
			);
		}
		// Allocated Amount
		if (allocatedAmount !== '') {
			filterStringArray.push(
				encodeURIComponent(
					generateNumberFilterString('allocatedAmount', allocatedAmount)
				)
			);
		}
		// Target Date
		if (targetDate !== undefined) {
			filterStringArray.push(
				encodeURIComponent(generateDateFilterString('targetDate', targetDate))
			);
		}
		if (filterStringArray.length === 0) return;
		if (filterStringArray.length === 1) {
			router.push(`/goals?filter=${filterStringArray[0]}`);
			return;
		}
		router.push(`/goals?filter=and(${filterStringArray.join(',')})`);
	};

	// allocated amount , target amount, target date, title
	return (
		<div className='flex gap-2 mb-4 justify-between w-full items-center'>
			<div className='overflow-x-auto flex gap-2 items-center p-1'>
				{/* Title */}
				<TextFilter label='Title' onValueChange={setTitle} />
				{/* Target Amount */}
				<NumberFilter
					label='Target Amount'
					value={targetAmount}
					onValueChange={setTargetAmount}
				/>
				{/* Allocated Amount */}
				<NumberFilter
					label='Allocated Amount'
					value={allocatedAmount}
					onValueChange={setAllocatedAmount}
				/>
				<DateFilter handleDateSelect={setTargetDate} label='Target Date' />
			</div>
			<div className='flex gap-2 items-center'>
				<Button onClick={clearFilter}>Clear</Button>
				<Button onClick={applyFilter}>Apply</Button>
			</div>
		</div>
	);
};

export default GoalTableFilter;
