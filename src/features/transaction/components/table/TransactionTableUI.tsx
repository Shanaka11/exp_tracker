'use client';
import { DataTable } from '@/features/ui/common/DataTable';
import React from 'react';
import { transactionTableColumns } from './Columns';
import { TransactionDto } from '../../models/transaction';
import TransactionTableFilter from './TransactionTableFilter';
import TableActions from '@/features/ui/common/TableActions';
import { Dialog } from '@/components/ui/dialog';
import NewTransactionDialog from '../NewTransactionDialog';
import { useTableActionsHook } from '@/hooks/useTableActionsHook';
import { useRouter } from 'next/navigation';

type TransactionTableProps = {
	data?: TransactionDto[];
};

const TransactionTableUI = ({ data }: TransactionTableProps) => {
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
	} = useTableActionsHook();

	const router = useRouter();

	const handleSaveSuccess = () => {
		closeDialog();
		setTimeout(() => router.refresh(), 1000);
	};
	return (
		<>
			<Dialog
				open={newTransactionDialogState !== 'CLOSED'}
				onOpenChange={() => closeDialog()}
			>
				<NewTransactionDialog
					handleSaveSuccess={handleSaveSuccess}
					transactionAmount={0}
				/>
			</Dialog>
			<TableActions
				selectedItemLength={selectedItemLength}
				setShowFilter={setShowFilter}
				showFilter={showFilter}
				handleNewOnClick={openNewDialog}
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
