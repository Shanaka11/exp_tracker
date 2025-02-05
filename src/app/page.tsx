import GoalsCard from '@/features/goals/components/GoalsCard';
import CostDistributionCard from '@/features/transaction/components/CostDistributionCard';
import NewTransactionCard from '@/features/transaction/components/NewTransactionCard';
import TransactionList from '@/features/transaction/components/TransactionList';

export default function Home() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-2 h-full grid-rows-[auto_auto_1fr]'>
			<div className='col-span-1 md:col-span-3 bg-slate-50 rounded-sm p-2'>
				1
			</div>
			<NewTransactionCard />
			<section className='grid grid-rows-2 flex-col gap-2 col-span-1 md:col-span-2 md:row-span-2'>
				<GoalsCard />
				<CostDistributionCard />
			</section>
			<section className='bg-slate-50 rounded-sm p-4 flex flex-col gap-2 overflow-auto'>
				<h4 className='font-bold text-lg'>Recent Transactions</h4>
				<TransactionList />
			</section>
		</div>
	);
}
