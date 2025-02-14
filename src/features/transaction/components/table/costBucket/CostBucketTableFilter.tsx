import { Button } from '@/components/ui/button';
import TextFilter from '@/features/ui/common/TableFilters/TextFilter';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CostBucketTableFilter = () => {
	const [text, setText] = useState('');

	const router = useRouter();

	const applyFilter = () => {
		if (text === '') return;
		router.push(`/costbuckets?filter=ilike(name,${text})`);
	};

	return (
		<div className='flex gap-2 mb-4 justify-between w-full items-center'>
			<div className='overflow-x-auto flex gap-2 items-center'>
				<TextFilter label='Cost Bucket' onValueChange={setText} />
			</div>
			<Button onClick={applyFilter}>Apply</Button>
		</div>
	);
};

export default CostBucketTableFilter;
