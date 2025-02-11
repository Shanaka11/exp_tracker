import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createGoalAction } from '../actions/createGoalAction';
import { CreateGoalSchema } from '../models/goal';
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
import { Button } from '@/components/ui/button';
import { CalendarIcon, Loader2 } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import IconSelector from '@/features/Icons/components/IconSelector';
import { IconType } from '@/features/Icons/components/DynamicIcon';

type CreateNewGoalDialogProps = {
	handleSaveSuccess: () => void;
};

const CreateNewGoalDialog = ({
	handleSaveSuccess,
}: CreateNewGoalDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const form = useForm<z.infer<typeof CreateGoalSchema>>({
		resolver: zodResolver(CreateGoalSchema),
		defaultValues: {
			allocatedAmount: 0,
			targetDate: new Date(),
			icon: 'house',
			title: '',
			targetAmount: 0,
			user: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	const [selectedIcon, setSelectedIcon] = useState<IconType>('house');

	const handleOnSubmit = async (values: z.infer<typeof CreateGoalSchema>) => {
		try {
			setIsLoading(true);
			toast({
				title: 'Goal being added',
			});
			await createGoalAction(values);
			form.reset();
			setSelectedIcon('house');
			handleSaveSuccess();
			toast({
				title: 'Goal Added successfully',
			});
			setIsLoading(false);
		} catch (e: unknown) {
			setIsLoading(false);
			if (e instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Error adding Goal',
					description: e.message,
				});
				return;
			}
			toast({
				variant: 'destructive',
				title: 'Error adding Goal',
			});
		}
	};

	const handleIconSelect = (icon: IconType) => {
		setSelectedIcon(icon);
		form.setValue('icon', icon);
	};

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>New Goal</DialogTitle>
				<DialogDescription>Create New Goal</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					id='new-goal-form'
					onSubmit={form.handleSubmit(handleOnSubmit)}
					className='grid gap-3 py-2 grid-cols-2'
				>
					<FormField
						control={form.control}
						name='title'
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
						name='targetDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel className='mb-[10px]'>Traget Date</FormLabel>
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
					<div className='flex flex-col gap-2'>
						<FormLabel className='mb-[10px]'>Icon</FormLabel>
						<IconSelector
							selectedIcon={selectedIcon}
							onIconSelect={handleIconSelect}
						/>
					</div>
					<FormField
						control={form.control}
						name='targetAmount'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Target Amount</FormLabel>
								<FormControl>
									<Input {...field} type='number' step='0.01' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='allocatedAmount'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Current Allocation</FormLabel>
								<FormControl>
									<Input {...field} type='number' step='0.01' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<DialogFooter>
				<Button type='submit' form='new-goal-form' disabled={isLoading}>
					{isLoading && <Loader2 className='animate-spin' />}
					Add Goal
				</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export default CreateNewGoalDialog;
