import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import DateFilter from '@/features/ui/common/TableFilters/DateFilter';
import NumberFilter from '@/features/ui/common/TableFilters/NumberFilter';
import TextFilter from '@/features/ui/common/TableFilters/TextFilter';
import {
	DecodedStrings,
	decodeFilterString,
	generateDateFilterString,
	generateNumberFilterString,
} from '@/lib/tableFilterUtils';
import { Ban, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { GoalTable } from '../../models/goal';
import Tag from '@/features/ui/common/Tag';

type GoalTableFilterProps = {
	filterStringBase?: string;
};

const GoalTableFilter = ({ filterStringBase }: GoalTableFilterProps) => {
	const [existingFilters, setExistingFilters] = useState<DecodedStrings[]>([]);
	const [title, setTitle] = useState('');
	const [allocatedAmount, setAllocatedAmount] = useState('');
	const [targetAmount, setTargetAmount] = useState('');
	const [targetDate, setTargetDate] = useState<DateRange | undefined>();
	const router = useRouter();

	useEffect(() => {
		if (filterStringBase) {
			const tempDecodedStrings = decodeFilterString(
				//@ts-expect-error types not defined
				GoalTable,
				filterStringBase
			);
			setExistingFilters(tempDecodedStrings);
		} else {
			setExistingFilters([]);
			setTitle('');
			setAllocatedAmount('');
			setTargetAmount('');
			setTargetDate(undefined);
		}
	}, [filterStringBase]);
	const applyFilter = () => {
		if (filterStringBase !== undefined) return router.push('/goals');
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
			<div>
				{filterStringBase === undefined && (
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
				)}
				{existingFilters.length > 0 && (
					<div className='flex gap-2 items-center mt-1 h-11'>
						{existingFilters.map((filter) => (
							<Tag title={filter.label} key={filter.label} />
						))}
					</div>
				)}
			</div>
			<div className='flex gap-2 items-center'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button onClick={applyFilter} size='icon'>
								{filterStringBase === undefined ? <Check /> : <Ban />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							{filterStringBase === undefined ? (
								<p>Apply Filter</p>
							) : (
								<p>Clear Filter</p>
							)}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};

export default GoalTableFilter;
