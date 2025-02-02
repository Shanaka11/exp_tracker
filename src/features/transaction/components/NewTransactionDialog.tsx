import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type NewTransactionDialogProps = {
	transactionAmount: number;
};

const NewTransactionDialog = ({
	transactionAmount,
}: NewTransactionDialogProps) => {
	const [currDate] = useState(new Date().toISOString().split('T')[0]);
	const [costBucket] = useState(''); // Add this line

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>New Transaction</DialogTitle>
				<DialogDescription>Create New Transaction</DialogDescription>
			</DialogHeader>
			<div className='grid gap-2 py-2 grid-cols-2'>
				<div>
					<Label htmlFor='amount' className='text-right'>
						Amount
					</Label>
					<Input
						id='amount'
						defaultValue={transactionAmount}
						inputMode='decimal'
						type='number'
						step='0.01'
					/>
				</div>
				<div>
					<Label htmlFor='Date' className='text-right'>
						Date
					</Label>
					<Input
						id='Date'
						defaultValue={currDate}
						type='date'
						className='justify-end'
					/>
				</div>
				<div className='flex gap-2 justify-end items-center col-span-2 pr-1'>
					<Switch id='Expense' />
					<Label htmlFor='Expense' className='text-right'>
						Expense
					</Label>
				</div>
				<div className='col-span-2'>
					<Label htmlFor='CostBucket' className='text-right'>
						Cost Bucket
					</Label>
					<Input id='Cost Bucket' defaultValue={costBucket} />
				</div>
				<div className='col-span-2'>
					<Label htmlFor='Notes' className='text-right'>
						Notes
					</Label>
					<Textarea id='Notes' defaultValue={''} />
				</div>
			</div>
			<DialogFooter>
				<Button type='submit'>Add Transacaction</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export default NewTransactionDialog;
