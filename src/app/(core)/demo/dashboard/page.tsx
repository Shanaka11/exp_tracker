import GoalsCard from '@/features/goals/components/GoalsCard';
import CostDistributionCard from '@/features/transaction/components/CostDistributionCard';
import NewTransactionCard from '@/features/transaction/components/NewTransactionCard';
import SummaryCard from '@/features/transaction/components/SummaryCard';
import TransactionList from '@/features/transaction/components/TransactionList';
import React from 'react';

const page = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-2 h-full grid-rows-[auto_auto_1fr]'>
			<SummaryCard demo={true} />
			<NewTransactionCard demo={true} />
			<section className='grid grid-rows-2 gap-2 col-span-1 md:col-span-2 md:row-span-2 grid-cols-subgrid'>
				<GoalsCard demo={true} />
				<CostDistributionCard demo={true} />
			</section>
			<section className='bg-slate-50 rounded-sm p-4 flex flex-col gap-2 overflow-auto'>
				<h4 className='font-bold text-lg'>Recent Transactions</h4>
				<TransactionList demo={true} />
			</section>
		</div>
	);
};

export default page;
