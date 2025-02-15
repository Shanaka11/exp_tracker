'use client';
import { DataTable } from '@/features/ui/common/DataTable';
import TableActions from '@/features/ui/common/TableActions';
import React, { useState } from 'react';
import { goalTableColumns } from './Columns';
import { GoalDto } from '../../models/goal';
import { useTableActionsHook } from '@/hooks/useTableActionsHook';
import CreateNewGoalDialog, {
	NewGoalDialogFormState,
} from '../CreateNewGoalDialog';
import { Dialog } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { deleteGoalAction } from '../../actions/deleteGoalAction';
import GoalTableFilter from './GoalTableFilter';

type GoalTableUIProps = {
	data: GoalDto[];
};

const GoalTableUI = ({ data }: GoalTableUIProps) => {
	const [formState, setFormState] = useState<NewGoalDialogFormState>({
		open: false,
		operation: 'edit',
	});

	const router = useRouter();
	const { toast } = useToast();

	const {
		showFilter,
		setShowFilter,
		rowSelection,
		setRowSelection,
		newTransactionDialogState,
		selectedItemLength,
		closeDialog,
		openEditDialog,
		openNewDialog,
		clearSelection,
	} = useTableActionsHook({ showFilterOnMount: false });

	const handleEditOnClick = () => {
		const selectedRowIndex = Number(Object.keys(rowSelection)[0]);
		setFormState({
			...formState,
			id: {
				value: data[selectedRowIndex].id,
			},
			title: {
				value: data[selectedRowIndex].title,
			},
			allocatedAmount: {
				value: data[selectedRowIndex].allocatedAmount,
				disabled: true,
			},
			targetAmount: {
				value: data[selectedRowIndex].targetAmount,
			},
			targetDate: {
				value: data[selectedRowIndex].targetDate,
			},
			icon: {
				value: data[selectedRowIndex].icon,
			},
			createdAt: {
				value: data[selectedRowIndex].createdAt,
			},
			updatedAt: {
				value: data[selectedRowIndex].updatedAt,
			},
			user: {
				value: data[selectedRowIndex].user,
			},
			open: true,
			operation: 'edit',
		});
		openEditDialog();
	};

	const handleDeleteOnClick = async () => {
		try {
			if (data === undefined) return;
			toast({
				title: 'Deleting Transactions',
			});
			// Pick the selected transactions and delete them
			const selectedItems = Object.keys(rowSelection).map(
				(index) => data[Number(index)]
			);
			await deleteGoalAction(selectedItems);
			toast({
				title: 'Transactions Deleted Successfully',
			});
			handleOnSaveSuccess();
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					description: error.message,
				});
				return;
			}
			console.error(error);
			return;
		}
	};

	const handleOnSaveSuccess = () => {
		closeDialog();
		setTimeout(() => {
			router.refresh();
			clearSelection();
		}, 1000);
	};
	return (
		<>
			<Dialog
				open={
					newTransactionDialogState === 'NEW' ||
					(newTransactionDialogState === 'UPDATE' && formState.open)
				}
				onOpenChange={() => closeDialog()}
			>
				<CreateNewGoalDialog
					handleSaveSuccess={handleOnSaveSuccess}
					formState={
						newTransactionDialogState === 'UPDATE' ? formState : undefined
					}
				/>
			</Dialog>
			<TableActions
				selectedItemLength={selectedItemLength}
				setShowFilter={setShowFilter}
				showFilter={showFilter}
				handleNewOnClick={openNewDialog}
				handleEditOnClick={handleEditOnClick}
				handleDeleteOnClick={handleDeleteOnClick}
			/>
			{showFilter && <GoalTableFilter />}
			<DataTable
				columns={goalTableColumns}
				data={data ?? []}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
			/>
		</>
	);
};

export default GoalTableUI;
