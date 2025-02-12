import React from 'react';
import { getTransactionsAction } from '@/features/transaction/actions/getTransactionsAction';
import TransactionTableUI from '@/features/transaction/components/table/TransactionTableUI';

const page = async () => {
	const data = await getTransactionsAction(false);
	return (
		<div className='container mx-auto rounded-sm p-4 bg-slate-50'>
			<h1 className='font-bold text-lg mb-2'>Transactions</h1>
			<TransactionTableUI data={data} />
		</div>
	);
};

export default page;
