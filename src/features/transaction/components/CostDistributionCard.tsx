import React from 'react';
import CostDistributionChart from './CostDistributionChart';
import { getCostDistributionAction } from '../actions/getCostDistributionAction';

const CostDistributionCard = async () => {
	const costDestribution = await getCostDistributionAction();

	return (
		<section className='bg-slate-50 rounded-sm p-4 flex flex-col gap-2 md:col-span-2'>
			<h4 className='font-bold text-lg'>Cost Distribution</h4>
			<CostDistributionChart distribution={costDestribution} />
		</section>
	);
};

export default CostDistributionCard;
