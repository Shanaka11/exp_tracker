import React from 'react';
import { Transaction } from '../actions/dummy';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type TransactionListItemProps = {
	transaction: Transaction;
};

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
	return (
		<li
			className={cn(
				`bg-slate-50 flex gap-2 justify-between hover:bg-slate-100 p-1 transition-all w-full border-l-4 border-red-600`,
				transaction.isExpense && 'border-red-600',
				!transaction.isExpense && 'border-green-600'
			)}
		>
			{/* <div className='rounded-full bg-black text-white w-14 text-center'>T</div> */}
			<div>
				<p className='text-lg'>{format(transaction.date, 'PPP')}</p>
				<p className='text-sm'>{transaction.costBucket}</p>
				<p className='text-sm'>{transaction.notes}</p>
			</div>
			<div>
				<p className='font-bold text-lg'>{transaction.amount.toFixed(2)}</p>
			</div>
		</li>
	);
};

export default TransactionListItem;
