'use client';
import { Button } from '@/components/ui/button';
import TextFilter from '@/features/ui/common/TableFilters/TextFilter';
import Tag from '@/features/ui/common/Tag';
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

	const clearFilter = () => {
		setText('');
		router.push('/costbuckets');
	};

	const applyFilter = () => {
		if (text === '') {
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

	const handleTagClose = () => {
		setText('');
		applyFilter();
	};

	return (
		<div className='flex gap-2 mb-4 justify-between w-full items-center'>
			<div>
				<div className='overflow-x-auto flex gap-2 items-center py-1'>
					<TextFilter label='Cost Bucket' onValueChange={setText} />
				</div>
				{existingFilters.length > 0 && (
					<div className='flex gap-2 items-center mt-1'>
						{existingFilters.map((filter) => (
							<Tag
								title={filter}
								key={filter}
								handleClose={() => {
									handleTagClose();
								}}
							/>
						))}
					</div>
				)}
			</div>
			<div className='flex gap-2 items-center'>
				<Button onClick={clearFilter}>Clear</Button>
				<Button onClick={applyFilter}>Apply</Button>
			</div>
		</div>
	);
};

export default CostBucketTableFilter;
