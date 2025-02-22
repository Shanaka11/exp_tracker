import { auth } from '@/features/auth/auth';
import { getUserCostBucketAction } from '@/features/transaction/actions/getUserCostBucketAction';
import CostBucketTableUI from '@/features/transaction/components/table/costBucket/CostBucketTableUI';
import { unauthorized } from 'next/navigation';
import React from 'react';

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>;
}) => {
	const session = await auth();

	if (!session) {
		return unauthorized();
	}

	const filterString = (await searchParams).filter;
	const data = await getUserCostBucketAction(filterString);
	return (
		<div className='container mx-auto rounded-sm p-4 bg-slate-50 transition-all'>
			<h1 className='font-bold text-lg mb-2'>Cost Buckets</h1>
			<CostBucketTableUI data={data} filterString={filterString} />
		</div>
	);
};

export default page;
