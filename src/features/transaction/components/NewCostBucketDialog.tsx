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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateCostBucketSchema } from '../models/costBucket';
import { z } from 'zod';
import { newCostBucketAction } from '../actions/newCostBucketAction';
import { Loader2 } from 'lucide-react';

const NewCostBucketDialog = () => {
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

	const handleOnSubmit = async (
		values: z.infer<typeof CreateCostBucketSchema>
	) => {
		try {
			setIsLoading(true);
			toast({
				title: 'Cost Bucket being added',
			});
			await newCostBucketAction(values);
			form.reset();
			// handleSaveSuccess();
			toast({
				title: 'Cost Bucket Added successfully',
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
					Add Cost Bucket
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export default NewCostBucketDialog;
