'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TransactionDto } from '../../models/transaction';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const transactionTableColumns: ColumnDef<TransactionDto>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => <span>{format(row.getValue('date'), 'PPP')}</span>,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
	{
		accessorKey: 'isExpense',
		header: 'Expense',
		cell: ({ row }) => <Switch checked={row.getValue('isExpense')} disabled />,
	},
	{
		accessorKey: 'costBucketName',
		header: 'Cost Bucket',
	},
];
