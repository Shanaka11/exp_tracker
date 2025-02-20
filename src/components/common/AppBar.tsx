import Link from 'next/link';
import React from 'react';
import Auth from '@/features/auth/components/Auth';

const AppBar = () => {
	return (
		<nav className='h-full bg-primary col-span-2 flex p-1 justify-between px-4 items-center'>
			<Link href='/'>
				<h1 className='text-lg font-bold text-background'>ExTracker</h1>
			</Link>
			<Auth />
		</nav>
	);
};

export default AppBar;
