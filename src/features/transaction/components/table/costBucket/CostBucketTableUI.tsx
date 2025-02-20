'use client';
import { CostBucketDto } from '@/features/transaction/models/costBucket';
import { DataTable } from '@/features/ui/common/DataTable';
import React, { useState } from 'react';
import { costBucketTableColumns } from './Columns';
import { useTableActionsHook } from '@/hooks/useTableActionsHook';
import TableActions from '@/features/ui/common/TableActions';
import { Dialog } from '@radix-ui/react-dialog';
import NewCostBucketDialog, {
	NewCostBucketDialogFormState,
} from '../../NewCostBucketDialog';
import { useRouter } from 'next/navigation';
import { deleteCostBucketAction } from '@/features/transaction/actions/deleteCostBucketAction';
import { useToast } from '@/hooks/use-toast';
import CostBucketTableFilter from './CostBucketTableFilter';

type CostBucketTableUIProps = {
	data: CostBucketDto[];
	filterString?: string;
	demo?: boolean;
};

const CostBucketTableUI = ({
	data,
	filterString,
	demo,
}: CostBucketTableUIProps) => {
	const [formState, setFormState] = useState<NewCostBucketDialogFormState>({
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
	} = useTableActionsHook({ showFilterOnMount: filterString !== undefined });

	const handleEditOnClick = () => {
		const selectedRowIndex = Number(Object.keys(rowSelection)[0]);
		setFormState({
			...formState,
			id: {
				value: data[selectedRowIndex].id,
			},
			name: {
				value: data[selectedRowIndex].name,
			},
			description: {
				value: data[selectedRowIndex].description,
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
			await deleteCostBucketAction(selectedItems, demo);
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
	const handleSaveSuccess = () => {
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
				<NewCostBucketDialog
					handleOnSaveSuccess={handleSaveSuccess}
					formState={
						newTransactionDialogState === 'UPDATE' ? formState : undefined
					}
					demo={demo}
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
			{showFilter && <CostBucketTableFilter filterString={filterString} />}
			<DataTable
				columns={costBucketTableColumns}
				data={data ?? []}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
			/>
		</>
	);
};

export default CostBucketTableUI;
