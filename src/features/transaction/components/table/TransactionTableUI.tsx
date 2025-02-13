import { DataTable } from '@/features/ui/common/DataTable';
import React from 'react';
import { transactionTableColumns } from './Columns';
import { TransactionDto } from '../../models/transaction';
import TransactionTableFilter from './TransactionTableFilter';

type TransactionTableProps = {
	data?: TransactionDto[];
};

const TransactionTableUI = ({ data }: TransactionTableProps) => {
	// Add the ribbon containing options for crud operations
	// Add the filter and search options
	return (
		<>
			<TransactionTableFilter />
			<DataTable columns={transactionTableColumns} data={data ?? []} />
		</>
	);
};

export default TransactionTableUI;
