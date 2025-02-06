import React from 'react';
import CostDistributionChart from './CostDistributionChart';

const CostDistributionCard = () => {
	return (
		<section className='bg-slate-50 rounded-sm p-4 flex flex-col gap-2 md:col-span-2'>
			<h4 className='font-bold text-lg'>Cost Distribution</h4>
			<CostDistributionChart />
		</section>
	);
};

export default CostDistributionCard;
