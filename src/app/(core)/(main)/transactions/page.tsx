import React from 'react';
import { getTransactionsAction } from '@/features/transaction/actions/getTransactionsAction';
import TransactionTableUI from '@/features/transaction/components/table/TransactionTableUI';

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>;
}) => {
	const filterString = (await searchParams).filter;
	const data = await getTransactionsAction(false, filterString);
	return (
		<div className='container mx-auto rounded-sm p-4 bg-slate-50 transition-all'>
			<h1 className='font-bold text-lg mb-2'>Transactions</h1>
			<TransactionTableUI data={data} filterString={filterString} />
		</div>
	);
};

export default page;
