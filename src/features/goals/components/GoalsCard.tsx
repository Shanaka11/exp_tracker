import React from 'react';
import { getGoalsAction } from '../actions/getGoalsAction';
import GoalList from './GoalList';

type GoalsCardProps = {
	demo?: boolean;
};
const GoalsCard = async ({ demo }: GoalsCardProps) => {
	const goals = await getGoalsAction(undefined, demo);

	return (
		<div className='bg-slate-50 rounded-sm p-4 overflow-auto flex flex-col w-full md:col-span-2'>
			<h4 className='font-bold text-lg mb-1'>Goals</h4>
			<GoalList goals={goals} />
		</div>
	);
};

export default GoalsCard;
