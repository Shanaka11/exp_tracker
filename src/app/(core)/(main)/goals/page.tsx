import { auth } from '@/features/auth/auth';
import { getGoalsAction } from '@/features/goals/actions/getGoalsAction';
import GoalTableUI from '@/features/goals/components/table/GoalTableUI';
import { unauthorized } from 'next/navigation';
import React from 'react';

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>;
}) => {
	const session = await auth();

	if (!session) {
		return unauthorized();
	}

	const filterString = (await searchParams).filter;
	const data = await getGoalsAction(filterString);
	return (
		<div className='container mx-auto rounded-sm p-4 bg-slate-50 transition-all'>
			<h1 className='font-bold text-lg mb-2'>Goals</h1>
			<GoalTableUI data={data} filterStringBase={filterString} />
		</div>
	);
};

export default page;
