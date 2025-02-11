'use client';
import React, { useState } from 'react';
import { Goal } from '../actions/dummy';
import GoalsLine from './GoalsLine';
import { Dialog } from '@/components/ui/dialog';
import NewTransactionDialog, {
	NewTransactionDialogFormState,
} from '@/features/transaction/components/NewTransactionDialog';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCostBucketGoalAction } from '@/features/transaction/actions/getCostBucketGoalAction';
import CreateNewGoalButton from './CreateNewGoalButton';

export type GoalListProps = {
	goals: Goal[];
};

const GoalList = ({ goals }: GoalListProps) => {
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
			value: 1,
			disabled: true,
		},
		notes: {
			value: '0',
			disabled: true,
		},
		open: false,
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
				value: note ?? formState.notes?.value ?? null,
			},
			open: true,
		});
	};
	const handleAddNewTransactionSuccess = () => {
		setFormState({
			...formState,
			open: false,
		});
		router.refresh();
	};

	const handleOpenChange = (open: boolean) => {
		setFormState({
			...formState,
			open,
		});
	};
	if (goals.length === 0) {
		return <CreateNewGoalButton />;
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
				/>
			</Dialog>
		</>
	);
};

export default GoalList;
