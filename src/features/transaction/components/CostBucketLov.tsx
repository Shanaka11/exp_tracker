'use client';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { HTMLAttributes } from 'react';
import { getUserCostBucketAction } from '../actions/getUserCostBucketAction';
import { CostBucketDto } from '../models/costBucket';

type CostBucketLovProps = {
	onCostBucketSelect: (costBucket: CostBucketDto | null) => void;
	selectedCostBucketId: number | null;
	disabled?: boolean;
};

const CostBucketLov = ({
	className,
	onCostBucketSelect,
	selectedCostBucketId,
	disabled,
}: CostBucketLovProps & HTMLAttributes<HTMLButtonElement>) => {
	const [open, setOpen] = React.useState(false);

	const { data: costBuckets } = useQuery({
		queryKey: ['costBucket'],
		queryFn: getUserCostBucketAction,
	});

	const handleSelect = (costBucket: CostBucketDto) => {
		setOpen(false);
		if (costBucket.id === selectedCostBucketId) {
			onCostBucketSelect(null);
			return;
		}
		onCostBucketSelect(costBucket);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn(`justify-between`, className)}
					disabled={disabled}
				>
					{selectedCostBucketId
						? costBuckets?.find(
								(costBucket) => costBucket.id === selectedCostBucketId
						  )?.name
						: 'Select...'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search Cost Bucket...' />
					<CommandList>
						<CommandEmpty>No Cost Bucket found.</CommandEmpty>
						<CommandGroup>
							{costBuckets?.map((costBucket) => (
								<CommandItem
									key={costBucket.id}
									value={costBucket.id.toString()}
									onSelect={() => {
										handleSelect(costBucket);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											selectedCostBucketId === costBucket.id
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{costBucket.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default CostBucketLov;
