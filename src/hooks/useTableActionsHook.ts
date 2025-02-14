'use client';
import { useMemo, useState } from 'react';

type NewDialogStatus = 'CLOSED' | 'NEW' | 'UPDATE';

export const useTableActionsHook = () => {
	const [showFilter, setShowFilter] = useState(false);
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
