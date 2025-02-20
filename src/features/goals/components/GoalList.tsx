'use client';
import React, { useState } from 'react';
import GoalsLine from './GoalsLine';
import { Dialog } from '@/components/ui/dialog';
import NewTransactionDialog, {
	NewTransactionDialogFormState,
} from '@/features/transaction/components/NewTransactionDialog';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCostBucketGoalAction } from '@/features/transaction/actions/getCostBucketGoalAction';
import CreateNewGoalButton from './CreateNewGoalButton';
import { GoalDto } from '../models/goal';

export type GoalListProps = {
	goals: GoalDto[];
	demo?: boolean;
};

const GoalList = ({ goals, demo }: GoalListProps) => {
	const [currentDate] = useState(new Date());

	const { data: costBucketGoal } = useQuery({
		queryKey: ['costBucketGoal'],
		queryFn: getCostBucketGoalAction,
		staleTime: Infinity,
	});
	const [formState, setFormState] = useState<NewTransactionDialogFormState>({
		isExpense: {
			value: true,
			disabled: true,
		},
		costBucket: {
			value: 0,
			disabled: true,
		},
		notes: {
			value: '0',
			disabled: true,
		},
		open: false,
		operation: 'new',
	});

	const router = useRouter();

	const handleAllocateFunds = (note: string) => {
		//if (formState.current.notes) {
		setFormState({
			...formState,
			costBucket: {
				...formState.costBucket,
				value:
					costBucketGoal && costBucketGoal.length > 0
						? costBucketGoal[0].id
						: 1,
			},
			notes: {
				...formState.notes,
				value: note,
			},
			open: true,
		});
	};
	const handleAddNewTransactionSuccess = () => {
		setFormState({
			...formState,
			open: false,
		});
		setTimeout(() => router.refresh(), 1000);
	};

	const handleOpenChange = (open: boolean) => {
		setFormState({
			...formState,
			open,
		});
	};
	if (goals.length === 0) {
		return <CreateNewGoalButton demo={demo} />;
	}
	return (
		<>
			<ol className='overflow-auto h-full'>
				{goals.map((goal) => (
					<GoalsLine
						key={goal.id}
						goal={goal}
						currentDate={currentDate}
						allocateFunds={handleAllocateFunds}
					/>
				))}
			</ol>
			<Dialog open={formState.open} onOpenChange={handleOpenChange}>
				<NewTransactionDialog
					handleSaveSuccess={handleAddNewTransactionSuccess}
					transactionAmount={0}
					formState={formState}
					description='Allocate funds to a goal'
					demo={demo}
				/>
			</Dialog>
		</>
	);
};

export default GoalList;
