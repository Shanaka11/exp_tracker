'use client';
import React, { useEffect, useState } from 'react';
import CostBucketLov from '../CostBucketLov';
import { CostBucketDto } from '../../models/costBucket';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import BooleanFilter from '@/features/ui/common/TableFilters/BooleanFilter';
import NumberFilter from '@/features/ui/common/TableFilters/NumberFilter';
import {
	DecodedStrings,
	decodeFilterString,
	generateBooleanFilterString,
	generateDateFilterString,
	generateNumberFilterString,
} from '@/lib/tableFilterUtils';
import DateFilter from '@/features/ui/common/TableFilters/DateFilter';
import { DateRange } from 'react-day-picker';
import { TransactionTable } from '../../models/transaction';
import Tag from '@/features/ui/common/Tag';
import { Ban, Check } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type TransactionTableFilterProps = {
	filterStringBase?: string;
};

const generateArrayFilterString = (costBuckets: CostBucketDto[]) => {
	if (costBuckets.length === 0) return '';
	if (costBuckets.length === 1) return `eq(costBucketId,${costBuckets[0].id})`;

	const flattenedArray = costBuckets.reduce((acc, bucket) => {
		if (acc === '') {
			return `eq(costBucketId,${bucket.id})`;
		}
		return acc + ',' + `eq(costBucketId,${bucket.id})`;
	}, '');

	return `or(${flattenedArray})`;
};

const TransactionTableFilter = ({
	filterStringBase,
}: TransactionTableFilterProps) => {
	const router = useRouter();
	const [existingFilters, setExistingFilters] = useState<DecodedStrings[]>([]);

	const applyFilter = () => {
		if (filterStringBase !== undefined) {
			router.push('/transactions');
			return;
		}
		const filterStringArray = [];
		let filterString = '';
		// Cost Bucket Filter
		filterString = encodeURIComponent(
			`${generateArrayFilterString(selectedCostBucket)}`
		);
		if (filterString !== '') {
			filterStringArray.push(filterString);
		}

		// Is Expense Filter
		filterString = generateBooleanFilterString(isExpense);
		if (filterString !== '') {
			filterStringArray.push(encodeURIComponent(filterString));
		}
		// Date Filter
		filterString = generateDateFilterString('date', date);
		if (filterString !== '') {
			filterStringArray.push(encodeURIComponent(filterString));
		}

		// Amount Filter
		filterString = generateNumberFilterString('amount', amount);
		if (filterString !== '') {
			filterStringArray.push(encodeURIComponent(filterString));
		}

		if (filterStringArray.length === 0) {
			router.push('/transactions');
			return;
		}
		if (filterStringArray.length === 1) {
			router.push(`/transactions?filter=${filterStringArray[0]}`);
			return;
		}
		router.push(`/transactions?filter=and(${filterStringArray.join(',')})`);
	};

	const [selectedCostBucket, setSelectedCostBucket] = useState<CostBucketDto[]>(
		[]
	);
	const [isExpense, setIsExpense] = useState<'true' | 'false' | undefined>(
		undefined
	);
	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<DateRange | undefined>();

	useEffect(() => {
		if (filterStringBase) {
			const tempDecodedStrings = decodeFilterString(
				//@ts-expect-error types not defined
				TransactionTable,
				filterStringBase
			);
			setExistingFilters(tempDecodedStrings);
		} else {
			setExistingFilters([]);
			setIsExpense(undefined);
			setAmount('');
			setDate(undefined);
			setSelectedCostBucket([]);
		}
	}, [filterStringBase]);

	const handleCostBucketSelect = (costBucket: CostBucketDto | null) => {
		if (costBucket !== null) {
			if (
				selectedCostBucket.filter((bucket) => bucket.id === costBucket?.id)
					.length > 0
			) {
				setSelectedCostBucket((prevState) =>
					prevState.filter((bucket) => bucket.id !== costBucket?.id)
				);
			} else {
				setSelectedCostBucket((prevState) => [...prevState, costBucket]);
			}
		}
	};

	return (
		<div className='flex gap-2 mb-4 justify-between w-full items-center'>
			<div>
				{filterStringBase === undefined && (
					<div className='overflow-x-auto flex gap-2 items-center py-1 h-11'>
						{/* <TextFilter label='Cost Bucket' onValueChange={() => {}} /> */}
						<CostBucketLov
							onCostBucketSelect={handleCostBucketSelect}
							selectedCostBucketId={
								selectedCostBucket.length > 0 ? selectedCostBucket[0].id : null
							}
							label='Cost Bucket'
							disabled={filterStringBase !== undefined}
						/>
						<BooleanFilter
							label='Expense'
							value={isExpense}
							onValueChange={setIsExpense}
							disabled={filterStringBase !== undefined}
						/>
						<NumberFilter
							value={amount}
							onValueChange={setAmount}
							label='Amount'
							disabled={filterStringBase !== undefined}
						/>
						<DateFilter
							handleDateSelect={setDate}
							disabled={filterStringBase !== undefined}
						/>
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
			<div className='flex items-center'>
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

export default TransactionTableFilter;
