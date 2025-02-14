import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import {
	ArrowLeftRight,
	ChartColumn,
	Goal,
	LayoutDashboard,
} from 'lucide-react';

const SideNav = () => {
	return (
		<nav className='hidden md:flex flex-col gap-2 items-center py-2 bg-primary'>
			<Link
				title='Dashboard'
				className={buttonVariants({
					variant: 'default',
					className: 'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
				})}
				href={'/dashboard'}
			>
				<LayoutDashboard />
			</Link>

			<Link
				title='Transactions'
				className={buttonVariants({
					variant: 'default',
					className: 'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
				})}
				href={'/transactions'}
			>
				<ArrowLeftRight />
			</Link>
			<Link
				title='Goals'
				className={buttonVariants({
					variant: 'default',
					className: 'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
				})}
				href={'/goals'}
			>
				<Goal />
			</Link>
			<Link
				title='Cost Bucket'
				className={buttonVariants({
					variant: 'default',
					className: 'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
				})}
				href={'/costbuckets'}
			>
				<ChartColumn />
			</Link>
		</nav>
	);
};

export default SideNav;
