import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HandCoins } from 'lucide-react';
import React from 'react';
import { dayCounter } from '@/lib/daycounter';
import DynamicIcon from '@/features/Icons/components/DynamicIcon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { GoalDto } from '../models/goal';

type GoalsLineProps = {
	goal: GoalDto;
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
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Progress
								value={(goal.allocatedAmount * 100) / goal.targetAmount}
							/>
						</TooltipTrigger>
						<TooltipContent>
							{`${(goal.allocatedAmount * 100) / goal.targetAmount}%`}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								onClick={() => allocateFunds(`ALLOCATED_TO_GOAL-${goal.id}`)}
							>
								<HandCoins />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Allocate Funds</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</li>
	);
};

export default GoalsLine;
