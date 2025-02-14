import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { newTransactionAction } from '../actions/newTransactionAction';
import { useToast } from '@/hooks/use-toast';
import { InsertTransactionSchema } from '../models/transaction';
import CostBucketLov from './CostBucketLov';
import { CostBucketDto } from '../models/costBucket';
import { updateTransactionAction } from '../actions/updateTransactionAction';

export type NewTransactionDialogFormState = {
	id?: {
		disabled?: boolean;
		value: number;
	};
	amount?: {
		disabled?: boolean;
		value: number;
	};
	date?: {
		disabled?: boolean;
		value: Date;
	};
	isExpense?: {
		disabled?: boolean;
		value: boolean;
	};
	costBucket?: {
		disabled?: boolean;
		value: number;
	};
	notes?: {
		disabled?: boolean;
		value: string;
	};
	createdAt?: {
		disabled?: boolean;
		value: Date;
	};
	updatedAt?: {
		disabled?: boolean;
		value: Date;
	};
	user?: {
		disabled?: boolean;
		value: string;
	};
	open: boolean; // To handle the dialog open state in the same state
	operation: 'edit' | 'new'; // Tells the dialog if it should be in edit mode or new mode
};

type NewTransactionDialogProps = {
	transactionAmount: number;
	handleSaveSuccess: () => void;
	formState?: NewTransactionDialogFormState;
	title?: string;
	description?: string;
};

const NewTransactionDialog = ({
	transactionAmount,
	handleSaveSuccess,
	formState,
	title,
	description,
}: NewTransactionDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCostBucketId, setSelectedCostBucketId] = useState<
		number | null
	>(null);
	const { toast } = useToast();
	const form = useForm<z.infer<typeof InsertTransactionSchema>>({
		resolver: zodResolver(InsertTransactionSchema),
		defaultValues: {
			amount: transactionAmount,
			date: new Date(),
			isExpense:
				formState?.isExpense?.value === undefined
					? true
					: formState.isExpense.value,
			costBucketId: formState?.costBucket?.value ?? 0,
			note: formState?.notes?.value ?? '',
			user: '1',
		},
	});

	useEffect(() => {
		if (formState?.open) {
			form.reset();
			setSelectedCostBucketId(formState.costBucket?.value ?? null);
			form.setValue('costBucketId', formState.costBucket?.value ?? 0);
			form.setValue('note', formState.notes?.value ?? '');
			form.setValue('isExpense', formState.isExpense?.value ?? true);
			form.setValue('amount', formState.amount?.value ?? 0);
			form.setValue('date', formState.date?.value ?? new Date());
		}
	}, [
		formState?.open,
		form,
		formState?.costBucket?.value,
		formState?.notes?.value,
		formState?.isExpense?.value,
		formState?.amount?.value,
		formState?.date?.value,
	]);

	const onCostBucketSelect = (costBucket: CostBucketDto | null) => {
		if (costBucket === null) {
			setSelectedCostBucketId(null);
			form.resetField('costBucketId');
			return;
		}
		setSelectedCostBucketId(costBucket.id);
		form.setValue('costBucketId', costBucket.id);
	};

	const handleOnSubmit = async (
		values: z.infer<typeof InsertTransactionSchema>
	) => {
		try {
			setIsLoading(true);
			if (formState?.operation === 'new' || formState === undefined) {
				toast({
					title: 'Transaction being added',
				});
				// Trunc the time
				values.date.setUTCHours(0, 0, 0, 0);
				await newTransactionAction(values);
				form.reset();
				toast({
					title: 'Transaction Added successfully',
				});
			} else if (formState?.operation === 'edit') {
				toast({
					title: 'Transaction being updated',
				});
				values.date.setUTCHours(0, 0, 0, 0);
				if (
					formState.createdAt === undefined ||
					formState.updatedAt === undefined ||
					formState.user === undefined
				) {
					return;
				}
				await updateTransactionAction({
					id: formState.id?.value ?? 0,
					amount: values.amount,
					date: values.date,
					isExpense: values.isExpense,
					costBucketId: values.costBucketId,
					note: values.note,
					createdAt: formState.createdAt?.value,
					updatedAt: formState.updatedAt?.value,
					user: formState.user?.value,
				});
				form.reset();
				toast({
					title: 'Transaction updated successfully',
				});
			}
			setIsLoading(false);
			handleSaveSuccess();
		} catch (e: unknown) {
			setIsLoading(false);
			if (e instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Error adding transaction',
					description: e.message,
				});
				return;
			}
			toast({
				variant: 'destructive',
				title: 'Error adding transaction',
			});
		}
	};

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>{title ?? 'New Transaction'}</DialogTitle>
				<DialogDescription>
					{description ?? 'Create New Transaction'}
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					id='new-transaction-form'
					onSubmit={form.handleSubmit(handleOnSubmit)}
					className='grid gap-2 py-2 grid-cols-2'
				>
					<FormField
						control={form.control}
						name='amount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input {...field} type='number' step='0.01' autoFocus />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='date'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel className='mb-[10px]'>Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < new Date('1900-01-01')}
											initialFocus
											className='pointer-events-auto'
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='isExpense'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center gap-2 col-span-2 justify-end'>
								<FormLabel className='mt-2'>Expense</FormLabel>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
										className='mt-0'
										disabled={formState?.isExpense?.disabled}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<CostBucketLov
						onCostBucketSelect={onCostBucketSelect}
						selectedCostBucketId={selectedCostBucketId}
						className='col-span-2'
						disabled={formState?.costBucket?.disabled}
					/>
					<FormField
						control={form.control}
						name='note'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Notes</FormLabel>
								<FormControl>
									<Textarea {...field} disabled={formState?.notes?.disabled} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<DialogFooter>
				<Button type='submit' form='new-transaction-form' disabled={isLoading}>
					{isLoading && <Loader2 className='animate-spin' />}
					{formState?.operation === 'new' || formState === undefined
						? 'Add Transaction'
						: 'Update Transaction'}
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export default NewTransactionDialog;
