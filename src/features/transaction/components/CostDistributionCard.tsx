import React from 'react';
import CostDistributionChart from './CostDistributionChart';
import { getCostDistributionAction } from '../actions/getCostDistributionAction';

type CostDistributionCardProps = {
	demo?: boolean;
};

const CostDistributionCard = async ({ demo }: CostDistributionCardProps) => {
	const costDestribution = await getCostDistributionAction(demo);

	return (
		<section className='bg-slate-50 rounded-sm p-4 flex flex-col gap-2 md:col-span-2'>
			<h4 className='font-bold text-lg'>Cost Distribution</h4>
			<CostDistributionChart distribution={costDestribution} demo={demo} />
		</section>
	);
};

export default CostDistributionCard;
