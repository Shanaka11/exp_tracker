import { DataTable } from '@/features/ui/common/DataTable';
import React from 'react';
import { transactionTableColumns } from './Columns';
import { TransactionDto } from '../../models/transaction';

type TransactionTableProps = {
	data?: TransactionDto[];
};

const TransactionTableUI = ({ data }: TransactionTableProps) => {
	if (data === undefined || data.length === 0) {
		return <p>No Records Found</p>;
	}

	return <DataTable columns={transactionTableColumns} data={data} />;
};

export default TransactionTableUI;
