'use client';
import React, { useEffect, useState } from 'react';
import CostBucketLov from '../CostBucketLov';
import { CostBucketDto } from '../../models/costBucket';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import BooleanFilter from '@/features/ui/common/TableFilters/BooleanFilter';
import NumberFilter from '@/features/ui/common/TableFilters/NumberFilter';
import {
	decodeFilterString,
	generateBooleanFilterString,
	generateDateFilterString,
	generateNumberFilterString,
} from '@/lib/tableFilterUtils';
import DateFilter from '@/features/ui/common/TableFilters/DateFilter';
import { DateRange } from 'react-day-picker';
import { TransactionTable } from '../../models/transaction';

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
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const router = useRouter();

	console.log(activeFilters);

	const clearFilter = () => {
		setSelectedCostBucket([]);
		setIsExpense(undefined);
		setAmount('');
		setDate(undefined);
		router.push('/transactions');
	};

	const applyFilter = () => {
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

		if (filterStringArray.length === 0) return;
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
		//and(eq(costBucketId%2C2),eq(isExpense%2Ctrue),between(date%2C2025-02-06T00%3A00%3A00.000Z%2C2025-03-01T00%3A00%3A00.000Z),and(lt(amount%2C1000)%2Cgt(amount%2C100)%2Ceq(amount%2C500)))
		/*
		if (filterString) {
			const filter = filterString.split(',');
			const filterLabel = filter[0].split('(')[1];
			const filterValue = filter[1].split(')')[0];
			setText(filterValue);
			setExistingFilters([`${filterLabel} = ${filterValue}`]);
		} else {
		 	amount('');
			setDate(undefined);
			isExpense(undefined);
			selectedCostBucket([]);
		}
		 */
		if (filterStringBase) {
			//@ts-expect-error types not defined
			// console.log(decodeFilterString(TransactionTable, filterStringBase));
			setActiveFilters(decodeFilterString(TransactionTable, filterStringBase));
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
			<div className='overflow-x-auto flex gap-2 items-center py-1'>
				{/* <TextFilter label='Cost Bucket' onValueChange={() => {}} /> */}
				<CostBucketLov
					onCostBucketSelect={handleCostBucketSelect}
					selectedCostBucketId={
						selectedCostBucket.length > 0 ? selectedCostBucket[0].id : null
					}
					label='Cost Bucket'
				/>
				<BooleanFilter
					label='Expense'
					value={isExpense}
					onValueChange={setIsExpense}
				/>
				<NumberFilter value={amount} onValueChange={setAmount} label='Amount' />
				<DateFilter handleDateSelect={setDate} />
			</div>
			<div className='flex gap-2 items-center'>
				<Button onClick={clearFilter}>Clear</Button>
				<Button onClick={applyFilter}>Apply</Button>
			</div>
			{selectedCostBucket.map((bucket) => (
				<span key={bucket.id}>{bucket.name}</span>
			))}
		</div>
	);
};

export default TransactionTableFilter;
