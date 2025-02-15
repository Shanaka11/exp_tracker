'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { GoalDto } from '../../models/goal';
import { format } from 'date-fns';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const goalTableColumns: ColumnDef<GoalDto>[] = [
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
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'targetAmount',
		header: 'Target',
	},
	{
		accessorKey: 'allocatedAmount',
		header: 'Current Allocation',
	},
	{
		accessorKey: 'targetDate',
		header: 'Due Date',
		cell: ({ row }) => <span>{format(row.getValue('targetDate'), 'PPP')}</span>,
	},
];
