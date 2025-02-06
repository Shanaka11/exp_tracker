'use client';
import React, { useState } from 'react';
import { Goal } from '../actions/dummy';
import GoalsLine from './GoalsLine';
import { Dialog } from '@/components/ui/dialog';
import NewTransactionDialog, {
	NewTransactionDialogFormState,
} from '@/features/transaction/components/NewTransactionDialog';
import { useRouter } from 'next/navigation';

export type GoalListProps = {
	goals: Goal[];
};

const GoalList = ({ goals }: GoalListProps) => {
	const [currentDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState<NewTransactionDialogFormState>({
		isExpense: {
			value: true,
			disabled: true,
		},
		costBucket: {
			value: 2,
			disabled: true,
		},
		notes: {
			value: '0',
			disabled: true,
		},
	});
	const router = useRouter();

	const handleAllocateFunds = (note: string) => {
		if (formState.notes) {
			setFormState({
				...formState,
				notes: {
					...formState.notes,
					value: note ?? formState.notes.value,
				},
			});
		}
		setOpen(true);
	};
	const handleAddNewTransactionSuccess = () => {
		setOpen(false);
		router.refresh();
	};
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
			<Dialog open={open} onOpenChange={setOpen}>
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
