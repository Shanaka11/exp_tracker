import React from 'react';
import TransactionListItem from './TransactionListItem';
import { getTransactionsAction } from '../actions/getTransactionsAction';

const TransactionList = async () => {
	const transactions = await getTransactionsAction();

	return (
		<ol className='overflow-auto h-full'>
			{transactions.map((transaction) => (
				<TransactionListItem key={transaction.id} />
			))}
		</ol>
	);
};

export default TransactionList;
