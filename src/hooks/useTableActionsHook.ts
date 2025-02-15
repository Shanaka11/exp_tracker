'use client';
import { useMemo, useState } from 'react';

type NewDialogStatus = 'CLOSED' | 'NEW' | 'UPDATE';

type useTableActionsHookProps = {
	showFilterOnMount: boolean;
};

export const useTableActionsHook = ({
	showFilterOnMount,
}: useTableActionsHookProps) => {
	const [showFilter, setShowFilter] = useState(showFilterOnMount);
	const [rowSelection, setRowSelection] = useState({});
	const [newTransactionDialogState, setNewTransactionDialogState] =
		useState<NewDialogStatus>('CLOSED');
	const selectedItemLength = useMemo(
		() => Object.keys(rowSelection).length,
		[rowSelection]
	);

	const openEditDialog = () => {
		setNewTransactionDialogState('UPDATE');
	};

	const openNewDialog = () => {
		setNewTransactionDialogState('NEW');
	};
	const closeDialog = () => {
		setNewTransactionDialogState('CLOSED');
	};

	const clearSelection = () => {
		setRowSelection({});
	};

	return {
		showFilter,
		setShowFilter,
		rowSelection,
		setRowSelection,
		newTransactionDialogState,
		openEditDialog,
		openNewDialog,
		closeDialog,
		selectedItemLength,
		clearSelection,
	};
};
