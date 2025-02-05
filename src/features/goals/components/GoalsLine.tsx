import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HandCoins } from 'lucide-react';
import React from 'react';
import { Goal } from '../actions/dummy';
import { dayCounter } from '@/lib/daycounter';
import DynamicIcon from '@/features/Icons/components/DynamicIcon';

type GoalsLineProps = {
	goal: Goal;
	currentDate: Date;
	allocateFunds: (note: string) => void;
};

const GoalsLine = ({ goal, currentDate, allocateFunds }: GoalsLineProps) => {
	return (
		<li className='flex flex-col gap-1 py-2'>
			<div className='flex justify-between'>
				<div className='flex gap-2'>
					<DynamicIcon iconName={goal.icon} />
					<p>{goal.title}</p>
				</div>
				<p>{dayCounter(goal.targetDate, currentDate)}</p>
			</div>
			<div className='flex gap-2 items-center'>
				<Progress
					value={(goal.allocatedAmount * 100) / goal.targetAmount}
					title={`${(goal.allocatedAmount * 100) / goal.targetAmount}%`}
				/>
				<Button
					size='icon'
					title='Allocate Funds'
					onClick={() => allocateFunds(`ALLOCATED_TO_GOAL-${goal.id}`)}
				>
					<HandCoins />
				</Button>
			</div>
		</li>
	);
};

export default GoalsLine;
