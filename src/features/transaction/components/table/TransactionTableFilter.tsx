'use client';
import React, { useState } from 'react';
import CostBucketLov from '../CostBucketLov';
import { CostBucketDto } from '../../models/costBucket';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import BooleanFilter from '@/features/ui/common/TableFilters/BooleanFilter';

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
			<Button onClick={applyFilter}>Apply</Button>
			{selectedCostBucket.map((bucket) => (
				<span key={bucket.id}>{bucket.name}</span>
			))}
		</div>
	);
};

export default TransactionTableFilter;
