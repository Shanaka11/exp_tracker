'use client';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import TextFilter from '@/features/ui/common/TableFilters/TextFilter';
import Tag from '@/features/ui/common/Tag';
import { Ban, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type CostBucketTableFilterProps = {
	filterString?: string;
};

const CostBucketTableFilter = ({
	filterString,
}: CostBucketTableFilterProps) => {
	const [text, setText] = useState('');
	const [existingFilters, setExistingFilters] = useState<string[]>([]);

	const router = useRouter();

	const applyFilter = () => {
		if (text === '' || filterString !== undefined) {
			router.push('/costbuckets');
			return;
		}
		router.push(`/costbuckets?filter=ilike(name,${text})`);
	};

	useEffect(() => {
		if (filterString) {
			const filter = filterString.split(',');
			const filterLabel = filter[0].split('(')[1];
			const filterValue = filter[1].split(')')[0];
			setText(filterValue);
			setExistingFilters([`${filterLabel} = ${filterValue}`]);
		} else {
			setExistingFilters([]);
			setText('');
		}
	}, [filterString]);

	return (
		<div className='flex gap-2 mb-4 justify-between w-full items-center'>
			<div>
				{filterString === undefined && (
					<div className='overflow-x-auto flex gap-2 items-center py-1'>
						<TextFilter label='Cost Bucket' onValueChange={setText} />
					</div>
				)}
				{existingFilters.length > 0 && (
					<div className='flex gap-2 items-center mt-1'>
						{existingFilters.map((filter) => (
							<Tag title={filter} key={filter} />
						))}
					</div>
				)}
			</div>
			<div className='flex gap-2 items-center'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button onClick={applyFilter} size='icon'>
								{filterString === undefined ? <Check /> : <Ban />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							{filterString === undefined ? (
								<p>Apply Filter</p>
							) : (
								<p>Clear Filter</p>
							)}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};

export default CostBucketTableFilter;
