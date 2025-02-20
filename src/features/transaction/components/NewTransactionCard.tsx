'use client';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import React, { useState } from 'react';
import NewTransactionDialog from './NewTransactionDialog';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

type NewTransactionCardProps = {
	demo?: boolean;
};

const NewTransactionCard = ({ demo }: NewTransactionCardProps) => {
	const router = useRouter();
	const transactionInput = React.useRef<HTMLInputElement>(null);
	const [transactionAmount, setTransactionAmount] = useState<null | number>(
		null
	);

	const handleInputOnBlur = () => {
		if (transactionInput.current != null) {
			transactionInput.current.value = parseFloat(
				transactionInput.current.value
			).toFixed(2);
		}
	};

	const handleNewTransactionOnClick = () => {
		// open the dialog
		setTransactionAmount(
			parseFloat(
				transactionInput?.current === null
					? '0'
					: transactionInput.current.value
			)
		);
	};

	const handleInputEnterPressed = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			handleNewTransactionOnClick();
		}
	};

	const handleAddNewTransactionSuccess = () => {
		if (transactionInput.current != null) {
			transactionInput.current.value = '0';
			transactionInput.current.focus();
		}
		setTransactionAmount(null);
		setTimeout(() => router.refresh(), 1000);
	};

	return (
		<section className='bg-slate-50 rounded-sm p-4 flex flex-col gap-2'>
			<h4 className='font-bold text-lg'>New Transaction</h4>
			<Input
				ref={transactionInput}
				defaultValue={0}
				className='p-2 rounded-md border w-full text-right'
				type='number'
				step='0.01'
				autoFocus
				onBlur={handleInputOnBlur}
				onKeyUp={handleInputEnterPressed}
			/>
			<Button onClick={handleNewTransactionOnClick}>New Transaction</Button>
			<Dialog
				open={transactionAmount != null}
				onOpenChange={() => setTransactionAmount(null)}
			>
				{transactionAmount != null && (
					<NewTransactionDialog
						handleSaveSuccess={handleAddNewTransactionSuccess}
						transactionAmount={transactionAmount}
						demo={demo}
					/>
				)}
			</Dialog>
		</section>
	);
};

export default NewTransactionCard;
