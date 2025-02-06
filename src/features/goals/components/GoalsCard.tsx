import React from 'react';
import { getGoalsAction } from '../actions/getGoalsAction';
import GoalList from './GoalList';

const GoalsCard = async () => {
	const goals = await getGoalsAction();

	return (
		<div className='bg-slate-50 rounded-sm p-4 overflow-auto flex flex-col w-full md:col-span-2'>
			<h4 className='font-bold text-lg mb-1'>Goals</h4>
			<GoalList goals={goals} />
		</div>
	);
};

export default GoalsCard;
