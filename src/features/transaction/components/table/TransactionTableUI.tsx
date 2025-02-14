'use client';
import { DataTable } from '@/features/ui/common/DataTable';
import React, { useState } from 'react';
import { transactionTableColumns } from './Columns';
import { TransactionDto } from '../../models/transaction';
import TransactionTableFilter from './TransactionTableFilter';
import TableActions from '@/features/ui/common/TableActions';
import { Dialog } from '@/components/ui/dialog';
import NewTransactionDialog, {
	NewTransactionDialogFormState,
} from '../NewTransactionDialog';
import { useTableActionsHook } from '@/hooks/useTableActionsHook';
import { useRouter } from 'next/navigation';
import { deleteTransactionsAction } from '../../actions/deleteTransactionsAction';
import { useToast } from '@/hooks/use-toast';

type TransactionTableProps = {
	data?: TransactionDto[];
};

const TransactionTableUI = ({ data }: TransactionTableProps) => {
	const [formState, setFormState] = useState<NewTransactionDialogFormState>({
		open: false,
		operation: 'edit',
	});

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
	} = useTableActionsHook();

	const router = useRouter();
	const { toast } = useToast();

	const handleSaveSuccess = () => {
		closeDialog();
		setTimeout(() => {
			router.refresh();
			clearSelection();
		}, 1000);
	};

	const handleRowDelete = async () => {
		try {
			if (data === undefined) return;
			toast({
				title: 'Deleting Transactions',
			});
			// Pick the selected transactions and delete them
			const selectedItems = Object.keys(rowSelection).map(
				(index) => data[Number(index)]
			);
			deleteTransactionsAction(selectedItems);
			toast({
				title: 'Transactions Deleted Successfully',
			});
			handleSaveSuccess();
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

	const handleEditOnClick = () => {
		if (data === undefined) return;
		// Get the selected row data
		const selectedRowIndex = Number(Object.keys(rowSelection)[0]);
		//Set the form state with the selected row data
		setFormState((prevState) => ({
			...prevState,
			id: {
				value: data[selectedRowIndex].id,
				disabled: false,
			},
			amount: {
				value: data[selectedRowIndex].amount,
				disabled: false,
			},
			date: {
				value: data[selectedRowIndex].date,
				disabled: false,
			},
			isExpense: {
				value: data[selectedRowIndex].isExpense,
				disabled: false,
			},
			costBucket: {
				value: data[selectedRowIndex].costBucketId,
				disabled: false,
			},
			notes: {
				value: data[selectedRowIndex].note,
				disabled: false,
			},
			createdAt: {
				value: data[selectedRowIndex].createdAt,
				disabled: false,
			},
			updatedAt: {
				value: data[selectedRowIndex].updatedAt,
				disabled: false,
			},
			user: {
				value: data[selectedRowIndex].user,
				disabled: false,
			},
			open: true,
			operation: 'edit',
		}));
		openEditDialog();
	};
	return (
		<>
			<Dialog
				open={
					(newTransactionDialogState === 'UPDATE' && formState.open) ||
					newTransactionDialogState === 'NEW'
				}
				onOpenChange={() => closeDialog()}
			>
				<NewTransactionDialog
					handleSaveSuccess={handleSaveSuccess}
					transactionAmount={0}
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
				handleDeleteOnClick={handleRowDelete}
			/>
			{showFilter && <TransactionTableFilter />}
			<DataTable
				columns={transactionTableColumns}
				data={data ?? []}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
			/>
		</>
	);
};

export default TransactionTableUI;
