import { Button } from '@/components/ui/button';
import React from 'react';
import { auth } from '../auth';
import SignIn from './SignIn';
import Link from 'next/link';

const DashboardButton = async () => {
	const session = await auth();

	if (!session?.user) {
		return (
			<SignIn>
				<Button className='text-sm font-semibold uppercase' size='lg'>
					Visit Dashboard
				</Button>
			</SignIn>
		);
	}
	return (
		<Link href='/dashboard'>
			<Button className='text-sm font-semibold uppercase' size='lg'>
				Visit Dashboard
			</Button>
		</Link>
	);
};

export default DashboardButton;
