'use client';
import React, { useState } from 'react';
import CostBucketLov from '../CostBucketLov';
import { CostBucketDto } from '../../models/costBucket';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import BooleanFilter from '@/features/ui/common/TableFilters/BooleanFilter';
import NumberFilter from '@/features/ui/common/TableFilters/NumberFilter';

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

const generateNumberFilterString = (amount: string) => {
	if (amount === '') return '';
	if (amount[0] <= '9' && amount[0] >= '0') {
		amount = `=${amount}`;
	}
	const operations = amount.split(';');
	const filterArray = operations.map((operation) => {
		if (operation[0] === '=') {
			return `eq(amount,${operation.substring(1)})`;
		}
		if (operation[0] === '>') {
			if (operation[1] === '=') {
				return `gte(amount,${operation.substring(2)})`;
			}
			if (operation[1] === '<') {
				return `neq(amount,${operation.substring(2)})`;
			}
			return `gt(amount,${operation.substring(1)})`;
		}
		if (operation[0] === '<') {
			if (operation[1] === '=') {
				return `lte(amount,${operation.substring(2)})`;
			}
			return `lt(amount,${operation.substring(1)})`;
		}
		return '';
	});

	if (operations.length === 1) {
		return filterArray[0];
	}
	return `and(${filterArray.join(',')})`;
};

const TransactionTableFilter = () => {
	const router = useRouter();

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
		if (isExpense === 'true') {
			filterStringArray.push('eq(isExpense,true)');
		}
		if (isExpense === 'false') {
			filterStringArray.push('eq(isExpense,false)');
		}
		// Date Filter
		// Amount Filter
		if (amount !== '') {
			filterString = '';
			filterString = generateNumberFilterString(amount);
			if (filterString !== '') {
				filterStringArray.push(encodeURIComponent(filterString));
			}
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
		<div className='flex gap-2 mb-4'>
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
			<NumberFilter value={amount} onValueChange={setAmount} />
			<Button onClick={applyFilter}>Apply</Button>
			{selectedCostBucket.map((bucket) => (
				<span key={bucket.id}>{bucket.name}</span>
			))}
		</div>
	);
};

export default TransactionTableFilter;
