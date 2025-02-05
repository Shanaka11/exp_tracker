'use client';
import React, { useState } from 'react';
import { Goal } from '../actions/dummy';
import GoalsLine from './GoalsLine';

export type GoalListProps = {
	goals: Goal[];
};

const GoalList = ({ goals }: GoalListProps) => {
	const [currentDate] = useState(new Date());
	return (
		<ol className='overflow-auto h-full'>
			{goals.map((goal) => (
				<GoalsLine key={goal.id} goal={goal} currentDate={currentDate} />
			))}
		</ol>
	);
};

export default GoalList;
