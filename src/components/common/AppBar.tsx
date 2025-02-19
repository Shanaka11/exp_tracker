import Link from 'next/link';
import React from 'react';

const AppBar = () => {
	return (
		<nav className='h-10 bg-primary col-span-2 flex p-1 justify-between px-4'>
			<Link href='/'>
				<h1 className='text-lg font-bold text-background'>ExTracker</h1>
			</Link>
		</nav>
	);
};

export default AppBar;
