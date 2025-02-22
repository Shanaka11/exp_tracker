import React from 'react';
import TransactionListItem from './TransactionListItem';
import { getTransactionsAction } from '../actions/getTransactionsAction';

type TransactionListProps = {
	demo?: boolean;
};

const TransactionList = async ({ demo }: TransactionListProps) => {
	const transactions = await getTransactionsAction(true, undefined, demo);

	return (
		<ol className='overflow-auto h-full flex flex-col gap-1'>
			{transactions?.map((transaction) => (
				<TransactionListItem key={transaction.id} transaction={transaction} />
			))}
		</ol>
	);
};

export default TransactionList;
