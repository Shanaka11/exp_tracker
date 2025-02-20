'use client';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import {
	ArrowLeftRight,
	ChartColumn,
	Goal,
	LayoutDashboard,
} from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
import { usePathname } from 'next/navigation';

const SideNav = () => {
	const pathname = usePathname();

	return (
		<nav className='hidden md:flex flex-col gap-2 items-center py-2 bg-primary'>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={
								pathname.includes('/demo/') ? '/demo/dashboard' : '/dashboard'
							}
						>
							<LayoutDashboard />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Dashboard</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							title='Transactions'
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={
								pathname.includes('/demo/')
									? '/demo/transactions'
									: '/transactions'
							}
						>
							<ArrowLeftRight />
						</Link>
					</TooltipTrigger>
					<TooltipContent>Transactions</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							title='Cost Bucket'
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={
								pathname.includes('/demo/')
									? '/demo/costbuckets'
									: '/costbuckets'
							}
						>
							<ChartColumn />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Cost Buckets</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							title='Goals'
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={pathname.includes('/demo/') ? '/demo/goals' : '/goals'}
						>
							<Goal />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Goals</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
	);
};

export default SideNav;
