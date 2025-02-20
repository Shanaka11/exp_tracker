import { getTransactionsAction } from '@/features/transaction/actions/getTransactionsAction';
import TransactionTableUI from '@/features/transaction/components/table/TransactionTableUI';
import React from 'react';

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>;
}) => {
	const filterString = (await searchParams).filter;
	const data = await getTransactionsAction(false, filterString, true);
	return (
		<div className='container mx-auto rounded-sm p-4 bg-slate-50 transition-all'>
			<h1 className='font-bold text-lg mb-2'>Transactions</h1>
			<TransactionTableUI data={data} filterString={filterString} demo={true} />
		</div>
	);
};

export default page;
