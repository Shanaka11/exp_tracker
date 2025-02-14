import { getUserCostBucketAction } from '@/features/transaction/actions/getUserCostBucketAction';
import CostBucketTableUI from '@/features/transaction/components/table/costBucket/CostBucketTableUI';
import React from 'react';

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>;
}) => {
	const filterString = (await searchParams).filter;
	const data = await getUserCostBucketAction(filterString);
	return (
		<div className='container mx-auto rounded-sm p-4 bg-slate-50 transition-all'>
			<h1 className='font-bold text-lg mb-2'>Cost Buckets</h1>
			<CostBucketTableUI data={data} />
		</div>
	);
	return <div>page</div>;
};

export default page;
