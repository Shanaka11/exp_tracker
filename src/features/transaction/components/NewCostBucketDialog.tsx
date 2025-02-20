'use client';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateCostBucketSchema } from '../models/costBucket';
import { z } from 'zod';
import { newCostBucketAction } from '../actions/newCostBucketAction';
import { Loader2 } from 'lucide-react';
import { updateCostBucketAction } from '../actions/updateCostBucketAction';

export type NewCostBucketDialogFormState = {
	id?: {
		disabled?: boolean;
		value: number;
	};
	name?: {
		disabled?: boolean;
		value: string;
	};
	description?: {
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

type NewCostBucketDialogProps = {
	formState?: NewCostBucketDialogFormState;
	handleOnSaveSuccess: () => void;
	demo?: boolean;
};

const NewCostBucketDialog = ({
	formState,
	handleOnSaveSuccess,
	demo,
}: NewCostBucketDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const form = useForm<z.infer<typeof CreateCostBucketSchema>>({
		resolver: zodResolver(CreateCostBucketSchema),
		defaultValues: {
			name: '',
			description: '',
			user: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	useEffect(() => {
		if (formState?.open) {
			form.reset({
				name: formState.name?.value ?? '',
				description: formState.description?.value,
				user: formState.user?.value,
			});
		}

		if (formState === undefined) {
			form.reset({
				name: '',
				description: '',
				user: 'dummy',
			});
		}
	}, [
		form,
		formState,
		formState?.description?.value,
		formState?.name?.value,
		formState?.open,
		formState?.user?.value,
	]);

	const handleOnSubmit = async (
		values: z.infer<typeof CreateCostBucketSchema>
	) => {
		try {
			const isUpdate = formState?.operation === 'edit';
			setIsLoading(true);
			toast({
				title: `Cost Bucket being ${isUpdate ? 'updated' : 'added'}`,
			});
			if (isUpdate) {
				if (
					formState.createdAt === undefined ||
					formState.updatedAt === undefined ||
					formState.user === undefined
				) {
					return;
				}
				const result = await updateCostBucketAction(
					{
						...values,
						id: formState?.id?.value ?? 0,
						createdAt: formState?.createdAt?.value,
						updatedAt: formState?.updatedAt?.value,
						user: formState?.user?.value,
					},
					demo
				);
				if (result?.error) {
					throw new Error(result.error);
				}
			} else {
				await newCostBucketAction(values, demo);
			}
			form.reset();
			handleOnSaveSuccess();
			toast({
				title: `Cost Bucket ${isUpdate ? 'updated' : 'added'} successfully`,
			});
			setIsLoading(false);
		} catch (e: unknown) {
			setIsLoading(false);
			if (e instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Error adding Cost Bucket',
					description: e.message,
				});
				return;
			}
			toast({
				variant: 'destructive',
				title: 'Error adding Cost Bucket',
			});
		}
	};

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>New Cost Bucket</DialogTitle>
				<DialogDescription>Create New Cost Bucket</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					id='new-cost_bucket-form'
					onSubmit={form.handleSubmit(handleOnSubmit)}
					className='grid gap-2 py-2 grid-cols-2'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} autoFocus />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<DialogFooter>
				<Button type='submit' form='new-cost_bucket-form' disabled={isLoading}>
					{isLoading && <Loader2 className='animate-spin' />}
					{formState?.operation === 'edit' ? 'Update' : 'Add'} Cost Bucket
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export default NewCostBucketDialog;
